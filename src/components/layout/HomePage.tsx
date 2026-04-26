import {
  Search,
  Music,
  Image as ImageIcon,
  Theater,
  PartyPopper,
  Calendar,
  MapPin,
  Home,
  Plus,
  User,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const categories = [
  { name: "Concerts", icon: Music },
  { name: "Exhibitions", icon: ImageIcon },
  { name: "Theater", icon: Theater },
  { name: "Festivals", icon: PartyPopper },
];

const events = [
  {
    id: 1,
    title: "Summer Jazz Festival",
    date: "Feb 20, 2026",
    location: "Central Park",
    category: "Concert",
    image:
      "https://images.unsplash.com/photo-1761173084851-1e5302e931fe?q=80&w=1080",
  },
  {
    id: 2,
    title: "Modern Art Exhibition",
    date: "Feb 15, 2026",
    location: "City Gallery",
    category: "Exhibition",
    image:
      "https://images.unsplash.com/photo-1569342380852-035f42d9ca41?q=80&w=1080",
  },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="p-6 space-y-4 bg-white shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold">Discover</h1>
          <p className="text-sm text-gray-500">
            Find your next cultural experience
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="flex gap-4 px-6 py-4 overflow-x-auto">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.name} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-500 text-white">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-gray-600">{cat.name}</span>
            </div>
          );
        })}
      </div>

      {/* EVENTS */}
      <div className="flex-1 px-6 py-4 space-y-4">
        <h2 className="text-sm text-gray-500">Upcoming Events</h2>

        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/app/events/${event.id}`)}
            className="bg-white rounded-xl shadow cursor-pointer hover:shadow-md transition"
          >
            <img
              src={event.image}
              alt={event.title}
              className="h-40 w-full object-cover rounded-t-xl"
            />

            <div className="p-4 space-y-2">
              <h3 className="font-medium">{event.title}</h3>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {event.date}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NAVBAR */}
      <div className="fixed bottom-0 w-full bg-white border-t">
        <div className="flex justify-around p-3">

          <button
            onClick={() => navigate("/app/home")}
            className={`flex flex-col items-center text-xs ${
              location.pathname.includes("home") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <Home className="w-5 h-5" />
            Home
          </button>

          <button
            onClick={() => navigate("/app/events")}
            className={`flex flex-col items-center text-xs ${
              location.pathname.includes("events") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <Calendar className="w-5 h-5" />
            Events
          </button>

          <button
            onClick={() => navigate("/app/create")}
            className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full -mt-6 shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigate("/app/profile")}
            className={`flex flex-col items-center text-xs ${
              location.pathname.includes("profile") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <User className="w-5 h-5" />
            Profile
          </button>

        </div>
      </div>
    </div>
  );
};