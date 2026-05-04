import {
  Bell,
  ChevronRight,
  Mail,
  Settings,
  Shield,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSavedEvents, type SavedEvent } from "../../utils/eventStorage";
import {
  deleteRegistration,
  fetchUserRegistrations,
  type UserRegistrationEvent,
} from "../../api/registrationsApi";
import { deleteAccount, getUser, updateUser } from "../../api/usersApi";
import {
  getAppLanguage,
  getAppTheme,
  setAppLanguage,
  setAppTheme,
  type AppLanguage,
  type AppTheme,
} from "../../utils/appSettings";
import { useTranslation } from "../../hooks/useTranslation";



const fallbackImage =
  "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1200";

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const t = useTranslation();
  const [user, setUser] = useState<any>(null);

  const [modal, setModal] = useState<
    "settings" | "edit" | "notifications" | "privacy" | null
  >(null);

  const [myEvents, setMyEvents] = useState<UserRegistrationEvent[]>([]);
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
  


  useEffect(() => {
    localStorage.removeItem("savedEvents");

    const userId = Number(localStorage.getItem("userId"));

    if (!userId) return;

    getUser(userId).then(setUser);

    fetchUserRegistrations(userId)
      .then(setMyEvents)
      .catch(() => setMyEvents([]));

    setSavedEvents(getSavedEvents());
  }, []);

  const handleRemoveMyEvent = async (registrationId: number) => {
    try {
      await deleteRegistration(registrationId);
      setMyEvents((prev) =>
        prev.filter((event) => event.registration_id !== registrationId)
      );
    } catch {
      alert("Failed to remove event");
    }
  };

  return (
    <section className="h-full overflow-y-auto bg-[#fbf7f3] dark:bg-[#1f1630] px-6 pt-8 pb-8 transition">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-[#563483] dark:text-[#f4eaff]">{t.profile}</h1>

        <button
          onClick={() => setModal("settings")}
          className="w-11 h-11 rounded-full bg-white dark:bg-[#2c2140] shadow-sm border border-[#eee3dc] dark:border-[#44345e] flex items-center justify-center text-[#84699d] dark:text-[#d5c3ef]"
        >
          <Settings size={24} />
        </button>
      </div>

      <div className="flex items-center gap-4 mt-7">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#643b93] to-[#e4b72f] text-white flex items-center justify-center text-2xl shadow-lg">
          AM
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#220640] dark:text-white">
            {user?.full_name || "User"}
          </h2>

          <p className="text-[#84699d] dark:text-[#cdb9e8]">
            {user?.email || "email@example.com"}
          </p>

          <div className="flex gap-5 mt-2 text-[#220640]">
            <span>
              <b>{myEvents.length}</b>{" "}
              <span className="text-[#84699d] dark:text-[#cdb9e8]">{t.eventsCount}</span>
            </span>
            <span>
              <b>{savedEvents.length}</b>{" "}
              <span className="text-[#84699d] dark:text-[#cdb9e8]">{t.savedCount}</span>
            </span>
          </div>
        </div>
      </div>

      <Block title={t.myEvents} seeAll={t.seeAll}>
        {myEvents.length > 0 ? (
          myEvents.map((event) => (
            <BackendEventRow
              key={event.registration_id}
              event={event}
              onClick={() => navigate(`/app/events/${event.event_id}`)}
              onRemove={() => handleRemoveMyEvent(event.registration_id)}
            />
          ))
        ) : (
          <EmptyText text={t.noEvents} />
        )}
      </Block>

      <Block title={t.savedEvents} seeAll={t.seeAll}>
        {savedEvents.length > 0 ? (
          savedEvents.map((event) => (
            <SavedEventRow
              key={event.id}
              event={event}
              onClick={() => navigate(`/app/events/${event.id}`)}
            />
          ))
        ) : (
          <EmptyText text={t.noSaved} />
        )}
      </Block>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#220640] dark:text-white mb-4">
          {t.settings}
        </h2>

        <div className="bg-white dark:bg-[#2c2140] rounded-3xl border border-[#eee3dc] dark:border-[#44345e] shadow-sm overflow-hidden">
          <SettingRow
            icon={<User className="text-[#643b93]" />}
            title={t.editProfile}
            onClick={() => setModal("edit")}
          />
          <SettingRow
            icon={<Bell className="text-[#e4b72f]" />}
            title={t.notifications}
            onClick={() => setModal("notifications")}
          />
          <SettingRow
            icon={<Shield className="text-[#8b77a3]" />}
            title={t.privacy}
            onClick={() => setModal("privacy")}
          />
        </div>
      </div>

      {modal && (
        <ProfileModal
          type={modal}
          user={user}
          onUserUpdated={setUser}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
};

const Block = ({
  title,
  seeAll,
  children,
}: {
  title: string;
  seeAll: string;
  children: React.ReactNode;
}) => (
  <div className="mt-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-[#220640] dark:text-white">
        {title}
      </h2>
      <button className="text-[#643b93] dark:text-[#d5c3ef] font-medium">
        {seeAll}
      </button>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const BackendEventRow = ({
  event,
  onClick,
  onRemove,
}: {
  event: UserRegistrationEvent;
  onClick: () => void;
  onRemove: () => void;
}) => (
  <div className="w-full bg-white rounded-3xl border border-[#eee3dc] shadow-sm p-4">
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 text-left"
    >
      <img
        src={
          event.image_url && event.image_url.includes("images.unsplash.com")
            ? event.image_url
            : fallbackImage
        }
        alt={event.title}
        className="w-20 h-20 rounded-2xl object-cover"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-[#220640]">{event.title}</h3>
        <p className="text-[#84699d] mt-1">{event.date}</p>
        <p className="text-[#84699d] text-sm">{event.location}</p>
      </div>

      <ChevronRight className="text-[#8b77a3]" />
    </button>

    <button
      onClick={onRemove}
      className="mt-4 w-full h-11 rounded-xl bg-red-50 text-red-500 font-medium"
    >
      Remove from My Events
    </button>
  </div>
);

const SavedEventRow = ({
  event,
  onClick,
}: {
  event: any;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full bg-white rounded-3xl border border-[#eee3dc] shadow-sm p-4 flex items-center gap-4 text-left"
  >
    <img
      src={
        event.image_url && event.image_url.includes("images.unsplash.com")
          ? event.image_url
          : fallbackImage
      }
      alt={event.title}
      className="w-20 h-20 rounded-2xl object-cover"
    />

    <div className="flex-1">
      <h3 className="font-semibold text-[#220640]">{event.title}</h3>
      <p className="text-[#84699d] mt-1">{event.event_date}</p>
    </div>

    <ChevronRight className="text-[#8b77a3]" />
  </button>
);

const EmptyText = ({ text }: { text: string }) => (
  <div className="bg-white dark:bg-[#2c2140] rounded-3xl border border-dashed border-[#e4d7ce] dark:border-[#44345e] p-6 text-center text-[#84699d] dark:text-[#d5c3ef]">
    {text}
  </div>
);

const SettingRow = ({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full p-5 flex items-center gap-4 border-b last:border-b-0 border-[#eee3dc] dark:border-[#44345e] text-left bg-white dark:bg-[#2c2140]"
  >
    {icon}
    <span className="flex-1 text-[#220640] dark:text-white font-medium">{title}</span>
    <ChevronRight size={20} className="text-[#8b77a3]" />
  </button>
);

const ProfileModal = ({
  type,
  user,
  onUserUpdated,
  onClose,
}: {
  type: "settings" | "edit" | "notifications" | "privacy";
  user: any;
  onUserUpdated: (user: any) => void;
  onClose: () => void;
}) => {
  const [name, setName] = useState(user?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [deleteEmail, setDeleteEmail] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [ language, setLanguageState] = useState<AppLanguage>(getAppLanguage());
  const [theme, setThemeState] = useState<AppTheme>(getAppTheme());
  const [showLanguages, setShowLanguages] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const t = useTranslation();
  const chooseLanguage = (value: AppLanguage) => {
    setAppLanguage(value);
    setLanguageState(value);
    setShowLanguages(false);
  };

  const chooseTheme = (value: AppTheme) => {
    setAppTheme(value);
    setThemeState(value);

    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setShowThemes(false);
  };
  const languageLabels = {
    en: "English",
    ru: "Русский",
    kk: "Қазақша",
  };

  const themeLabels = {
    light: "Light",
    dark: "Dark",
  };
  const [success, setSuccess] = useState("");

  const titles = {
    settings: "Settings",
    edit: "Edit Profile",
    notifications: "Notifications",
    privacy: "Privacy",
  };

  const handleSaveProfile = async () => {
    try {
      const userIdRaw = localStorage.getItem("userId");

      if (!userIdRaw) {
        alert("User is not logged in");
        return;
      }

      const userId = Number(userIdRaw);

      const updatedUser = await updateUser(userId, {
        full_name: name,
        email: email,
      });

      onUserUpdated(updatedUser);
      setSuccess("Profile updated successfully"); 
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to update profile");
    }
  };
  const handleDeleteAccount = async () => {
    try {
      if (!deleteEmail || !deletePassword) {
        alert("Enter email and password");
        return;
      }

      await deleteAccount(deleteEmail, deletePassword);

      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      alert("Account deleted successfully");
      window.location.href = "/login";
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete account");
    }
  };

  return (
    <div className="absolute inset-0 z-30 bg-black/30 flex items-end">
      <div className="w-full bg-white dark:bg-[#2c2140] rounded-t-[32px] p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#563483] dark:text-white">
            {titles[type]}
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#f8f3ef] flex items-center justify-center"  //вуву
          >
            <X size={22} />
          </button>
        </div>

        {type === "edit" && (
          <div className="space-y-4 pb-24">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b77a3]" />
              <input
                className="input input-with-icon"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b77a3]" />
              <input
                className="input input-with-icon"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            {success && (
              <p className="text-green-600 text-sm text-center font-medium">
                {success}
              </p>
            )}
            <button
              onClick={handleSaveProfile}
              className="w-full h-14 rounded-2xl bg-[#643b93] text-white font-semibold"
            >
              OK
            </button>
          </div>
        )}

        {type === "notifications" && (
          <div className="space-y-4 text-[#220640] pb-24">
            <ToggleRow title="Event reminders" />
            <ToggleRow title="New cultural events" />
            <ToggleRow title="Saved event updates" />
          </div>
        )}

        {type === "privacy" && (
          <div className="space-y-4 text-[#220640] pb-24">
            <ToggleRow title="Show my profile" />
            <ToggleRow title="Show my saved events" />
            <ToggleRow title="Allow recommendations" />
          </div>
        )}

        {type === "settings" && (
          <div className="space-y-4 pb-24">
            <div className="bg-[#f8f3ef] dark:bg-[#2c2140] rounded-2xl overflow-hidden transition">
              <button
                onClick={() => setShowLanguages((prev) => !prev)}
                className="w-full h-16 px-5 flex items-center justify-between text-[#220640] dark:text-white font-semibold"
              >
                <span>Language</span>
                <span className="text-[#643b93] dark:text-[#d5c3ef]">
                  {languageLabels[language]}
                </span>
              </button>

              {showLanguages && (
                <div className="px-4 pb-4 grid grid-cols-3 gap-3">
                  {(["en", "ru", "kk"] as AppLanguage[]).map((item) => (
                    <button
                      key={item}
                      onClick={() => chooseLanguage(item)}
                      className={`h-11 rounded-xl font-medium transition ${
                        language === item
                          ? "bg-[#643b93] text-white"
                          : "bg-white dark:bg-[#1f1630] text-[#563483] dark:text-[#d5c3ef]"
                      }`}
                    >
                      {languageLabels[item]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#f8f3ef] dark:bg-[#1f1630] rounded-2xl overflow-hidden transition">
              <button
                onClick={() => setShowThemes((prev) => !prev)}
                className="w-full h-16 px-5 flex items-center justify-between text-[#220640] dark:text-white font-semibold"
              >
                <span>{t.theme}</span>
                <span className="text-[#643b93] dark:text-[#d5c3ef]">
                  {themeLabels[theme]}
                </span>
              </button>

              {showThemes && (
                <div className="px-4 pb-4 grid grid-cols-2 gap-3">
                  {(["light", "dark"] as AppTheme[]).map((item) => (
                    <button
                      key={item}
                      onClick={() => chooseTheme(item)}
                      className={`h-11 rounded-xl font-medium transition ${
                        theme === item
                          ? "bg-[#643b93] text-white"
                          : "bg-white dark:bg-[#2c2140] text-[#563483] dark:text-[#d5c3ef]"
                      }`}
                    >
                      {themeLabels[item]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                window.location.href = "/login";
              }}
              className="w-full h-14 rounded-2xl bg-red-50 text-red-500 font-medium"
            >
              {t.logout}
            </button>
            <button
              onClick={() => setDeleteMode(true)}
              className="w-full h-14 rounded-2xl bg-red-100 text-red-600 font-medium"
            >
              Delete account
            </button>
          </div>
        )}
        {deleteMode && (
          <div className="absolute inset-0 z-40 bg-black/40 flex items-center justify-center px-6">
            <div className="w-full max-w-[360px] bg-white dark:bg-[#2c2140] rounded-3xl p-5 shadow-2xl">
              <h3 className="text-xl font-semibold text-[#563483] dark:text-white mb-2">
                Delete account
              </h3>

              <p className="text-sm text-[#84699d] dark:text-[#d5c3ef] mb-4">
                Enter your email and password to confirm account deletion.
              </p>

              <div className="space-y-3">
                <input
                  value={deleteEmail}
                  onChange={(e) => setDeleteEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input"
                />

                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input"
                />

                <button
                  onClick={handleDeleteAccount}
                  className="w-full h-12 rounded-xl bg-red-500 text-white font-semibold"
                >
                  Confirm delete
                </button>

                <button
                  onClick={() => setDeleteMode(false)}
                  className="w-full h-12 rounded-xl bg-[#f8f3ef] dark:bg-[#1f1630] text-red-500 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const ToggleRow = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between bg-[#fbf7f3] rounded-2xl px-4 py-4">
    <span>{title}</span>
    <button className="w-12 h-7 rounded-full bg-[#643b93] relative">
      <span className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full" />
    </button>
  </div>
);