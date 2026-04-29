import {
  Calendar,
  Image as ImageIcon,
  MapPin,
  Music,
  PartyPopper,
  Search,
  Theater,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../../api/eventsApi";

type EventItem = {
  id: number;
  title: string;
  description?: string; 
  category: string;
  location: string;
  event_date: string;
  event_time?: string;
  image_url?: string;
  price?: number;
  max_participants?: number;
};

const categories = [
  { name: "Concerts", value: "Concert", icon: Music },
  { name: "Exhibitions", value: "Exhibition", icon: ImageIcon },
  { name: "Theater", value: "Theater", icon: Theater },
  { name: "Festivals", value: "Festival", icon: PartyPopper },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const byCategory =
        selectedCategory === "All" || event.category === selectedCategory;

      const bySearch = event.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return byCategory && bySearch;
    });
  }, [events, selectedCategory, search]);

  return (
    <section className="h-full flex flex-col bg-[#fbf7f3]">
      <div className="shrink-0 px-6 pt-8 pb-5 bg-[#fbf7f3]">
        <header className="space-y-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#563483]">
              Discover
            </h1>
            <p className="text-[#84699d] mt-1">
              Find your next cultural experience
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8a76a0]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full h-14 rounded-2xl bg-white pl-14 pr-4 text-[#4b2b6f] shadow-md outline-none border border-[#eee4dc] focus:ring-2 focus:ring-[#68429a]"
            />
          </div>
        </header>

        <div className="grid grid-cols-4 gap-4 mt-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.value;

            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setSelectedCategory(active ? "All" : cat.value)}
                className="text-center"
              >
                <div
                  className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition ${
                    active ? "bg-[#e4b72f]" : "bg-[#643b93]"
                  }`}
                >
                  <Icon
                    className={active ? "text-[#2e104d]" : "text-white"}
                    size={30}
                  />
                </div>
                <p className="text-sm mt-3 text-[#3d205f]">{cat.name}</p>
              </button>
            );
          })}
        </div>

        <h2 className="mt-8 text-xl font-semibold text-[#2e104d]">
          Upcoming Events
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
        {filteredEvents.map((event) => (
          <article
            key={event.id}
            onClick={() => navigate(`/app/events/${event.id}`)}
            className="bg-white rounded-3xl overflow-hidden border border-[#eee3dc] shadow-sm cursor-pointer active:scale-[0.99] transition"
          >
            <div className="relative">
              <img
                src={
                  event.image_url && event.image_url.includes("images.unsplash.com")
                    ? event.image_url
                    : "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1200"
                }
                alt={event.title}
                className="w-full h-48 object-cover"
              />

              <span className="absolute top-4 right-4 bg-[#e0b834] text-[#2e104d] text-sm px-4 py-2 rounded-full shadow">
                {event.category}
              </span>
            </div>

            <div className="p-5 space-y-3">
              <h3 className="text-lg font-semibold text-[#220640]">
                {event.title}
              </h3>

              <p className="flex items-center gap-3 text-[#85699e]">
                <Calendar size={20} />
                {event.event_date}
              </p>

              <p className="flex items-center gap-3 text-[#85699e]">
                <MapPin size={20} />
                {event.location}
              </p>
            </div>
          </article>
        ))}

        {filteredEvents.length === 0 && (
          <p className="text-center text-[#84699d] py-10">
            No events found
          </p>
        )}
      </div>
    </section>
  );
};