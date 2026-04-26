import {
  Settings,
  Calendar,
  Bookmark,
  ChevronRight,
  Home,
  Plus,
  User,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const myEvents = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1708743536025-ecfe7ffb75b1?q=80&w=1080",
    title: "Live Jazz Night",
    date: "Feb 22, 2026",
  },
];

const savedEvents = [
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1743691434566-8d81416c66c3?q=80&w=1080",
    title: "Creative Workshop",
    date: "Mar 5, 2026",
  },
];

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Profile</h2>
          <Settings className="w-5 h-5 text-gray-500" />
        </div>

        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl">
            AM
          </div>

          <div>
            <h3 className="font-semibold">Alex Morgan</h3>
            <p className="text-sm text-gray-500">alex@email.com</p>

            <div className="flex gap-4 mt-1 text-sm">
              <span><b>12</b> Events</span>
              <span><b>8</b> Saved</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 px-4 py-4 space-y-6">

        {/* MY EVENTS */}
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold">My Events</h3>
            <span className="text-sm text-blue-500">See all</span>
          </div>

          {myEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/app/events/${event.id}`)}
              className="flex gap-3 bg-white p-3 rounded-xl shadow mb-2 cursor-pointer"
            >
              <img
                src={event.image}
                className="w-16 h-16 object-cover rounded-lg"
              />

              <div className="flex-1">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>

        {/* SAVED */}
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold">Saved Events</h3>
            <span className="text-sm text-blue-500">See all</span>
          </div>

          {savedEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/app/events/${event.id}`)}
              className="flex gap-3 bg-white p-3 rounded-xl shadow mb-2 cursor-pointer"
            >
              <img
                src={event.image}
                className="w-16 h-16 object-cover rounded-lg"
              />

              <div className="flex-1">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>

        {/* SETTINGS */}
        <div>
          <h3 className="font-semibold mb-2">Settings</h3>

          <div className="bg-white rounded-xl shadow divide-y">

            <div className="flex justify-between items-center p-3">
              <div className="flex gap-3 items-center">
                <User className="w-5 h-5 text-blue-500" />
                <span>Edit Profile</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </div>

            <div className="flex justify-between items-center p-3">
              <div className="flex gap-3 items-center">
                <Calendar className="w-5 h-5 text-green-500" />
                <span>Notifications</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </div>

            <div className="flex justify-between items-center p-3">
              <div className="flex gap-3 items-center">
                <Bookmark className="w-5 h-5 text-purple-500" />
                <span>Privacy</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </div>

          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="fixed bottom-0 w-full bg-white border-t">
        <div className="flex justify-around p-3">

          <button onClick={() => navigate("/app/home")}>
            <Home
              className={
                location.pathname.includes("home")
                  ? "text-blue-500"
                  : "text-gray-500"
              }
            />
          </button>

          <button onClick={() => navigate("/app/events")}>
            <Calendar
              className={
                location.pathname.includes("events")
                  ? "text-blue-500"
                  : "text-gray-500"
              }
            />
          </button>

          <button
            onClick={() => navigate("/app/create")}
            className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center -mt-6"
          >
            <Plus />
          </button>

          <button onClick={() => navigate("/app/profile")}>
            <User
              className={
                location.pathname.includes("profile")
                  ? "text-blue-500"
                  : "text-gray-500"
              }
            />
          </button>

        </div>
      </div>
    </div>
  );
};