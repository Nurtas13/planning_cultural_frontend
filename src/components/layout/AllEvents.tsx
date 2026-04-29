import { Calendar, MapPin, Search } from "lucide-react";
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
  image_url?: string | null;
  price?: number;
  max_participants?: number;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1200";

export const AllEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  return (
    <section className="h-full flex flex-col bg-[#fbf7f3]">
      <div className="shrink-0 px-6 pt-8 pb-5 bg-[#fbf7f3]">
        <h1 className="text-3xl font-semibold text-[#563483]">Events</h1>
        <p className="text-[#84699d] mt-1">All cultural events</p>

        <div className="relative mt-5">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8a76a0]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full h-14 rounded-2xl bg-white pl-14 pr-4 text-[#4b2b6f] shadow-md outline-none border border-[#eee4dc]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
        {filteredEvents.map((event) => (
          <button
            key={event.id}
            onClick={() => navigate(`/app/events/${event.id}`)}
            className="w-full bg-white rounded-3xl overflow-hidden border border-[#eee3dc] shadow-sm text-left"
          >
            <img
              src={
                event.image_url && event.image_url.includes("images.unsplash.com")
                  ? event.image_url
                  : fallbackImage
              }
              alt={event.title}
              className="w-full h-44 object-cover"
            />

            <div className="p-5 space-y-3">
              <div className="flex justify-between gap-3">
                <h2 className="text-lg font-semibold text-[#220640]">
                  {event.title}
                </h2>

                <span className="bg-[#e0b834] text-[#2e104d] text-xs px-3 py-1 rounded-full h-fit">
                  {event.category}
                </span>
              </div>

              <p className="flex items-center gap-3 text-[#85699e]">
                <Calendar size={19} />
                {event.event_date}
              </p>

              <p className="flex items-center gap-3 text-[#85699e]">
                <MapPin size={19} />
                {event.location}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};