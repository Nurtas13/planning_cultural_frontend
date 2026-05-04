import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Calendar, Home, Menu, Plus, User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";

export const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation();

  const [showMore, setShowMore] = useState(false);

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="min-h-dvh bg-[#f8f3ef] dark:bg-[#120c1d] flex justify-center transition">
      <div className="relative w-full max-w-[430px] min-h-dvh bg-[#fbf7f3] dark:bg-[#1f1630] overflow-hidden shadow-2xl">
        <main className="h-dvh overflow-y-auto pb-28">
          <Outlet />
        </main>

        <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white/95 dark:bg-[#241936]/95 backdrop-blur border-t border-[#eadfd7] dark:border-[#44345e] z-40">
          <div className="h-full grid grid-cols-5 items-center px-5">
            <button
              onClick={() => navigate("/app/home")}
              className={`flex flex-col items-center gap-1 text-xs ${
                isActive("home")
                  ? "text-[#5f3d8c] dark:text-[#f4eaff]"
                  : "text-[#8b77a3] dark:text-[#cdb9e8]"
              }`}
            >
              <Home size={24} />
              {t.home}
            </button>

            <button
              onClick={() => navigate("/app/events")}
              className={`flex flex-col items-center gap-1 text-xs ${
                isActive("events")
                  ? "text-[#5f3d8c] dark:text-[#f4eaff]"
                  : "text-[#8b77a3] dark:text-[#cdb9e8]"
              }`}
            >
              <Calendar size={24} />
              {t.events}
            </button>

            <button
              onClick={() => navigate("/app/create")}
              className="mx-auto -mt-8 w-16 h-16 rounded-full bg-[#e4b72f] text-[#2c124d] flex items-center justify-center shadow-xl border-[6px] border-[#fbf7f3] dark:border-[#1f1630]"
            >
              <Plus size={30} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => navigate("/app/profile")}
              className={`flex flex-col items-center gap-1 text-xs ${
                isActive("profile")
                  ? "text-[#5f3d8c] dark:text-[#f4eaff]"
                  : "text-[#8b77a3] dark:text-[#cdb9e8]"
              }`}
            >
              <User size={24} />
              {t.profile}
            </button>

            <button
              onClick={() => setShowMore(true)}
              className="flex flex-col items-center gap-1 text-xs text-[#8b77a3] dark:text-[#cdb9e8]"
            >
              <Menu size={24} />
              {t.more}
            </button>
          </div>
        </nav>

        {showMore && (
          <div className="absolute inset-0 bg-black/40 flex items-end z-50">
            <div className="w-full bg-white dark:bg-[#2c2140] rounded-t-[30px] p-6">
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-[#68547f] rounded-full mx-auto mb-5" />

              <h2 className="text-2xl font-semibold text-[#563483] dark:text-white mb-4">
                {t.helpTitle}
              </h2>

              <div className="space-y-3 text-[#2e104d] dark:text-white">
                <HelpCard title={t.helpFindTitle} text={t.helpFindText} />
                <HelpCard title={t.helpSaveTitle} text={t.helpSaveText} />
                <HelpCard title={t.helpAttendTitle} text={t.helpAttendText} />
                <HelpCard title={t.helpCreateTitle} text={t.helpCreateText} />
              </div>

              <button
                onClick={() => setShowMore(false)}
                className="w-full h-14 mt-5 rounded-2xl bg-[#643b93] text-white font-semibold"
              >
                {t.gotIt}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const HelpCard = ({ title, text }: { title: string; text: string }) => (
  <div className="p-4 rounded-2xl bg-[#f8f3ef] dark:bg-[#1f1630]">
    <b>{title}</b>
    <p className="text-sm text-[#84699d] dark:text-[#d5c3ef] mt-1">{text}</p>
  </div>
);