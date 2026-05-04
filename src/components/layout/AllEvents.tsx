import { Calendar, MapPin, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../../api/eventsApi";
import { useTranslation } from "../../hooks/useTranslation";

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
  const t = useTranslation();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  return (
    <section className="h-full flex flex-col bg-[#fbf7f3] dark:bg-[#1f1630] transition">
      <div className="shrink-0 px-6 pt-8 pb-5 bg-[#fbf7f3] dark:bg-[#1f1630]">
        <h1 className="text-3xl font-semibold text-[#563483] dark:text-[#f4eaff]">
          {t.events}
        </h1>
        <p className="text-[#84699d] dark:text-[#cdb9e8] mt-1">
          {t.allCulturalEvents}
        </p>

        <div className="relative mt-5">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8a76a0] dark:text-[#d5c3ef]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchEvents}
            className="w-full h-14 rounded-2xl bg-white dark:bg-[#2c2140] pl-14 pr-4 text-[#4b2b6f] dark:text-white shadow-md outline-none border border-[#eee4dc] dark:border-[#44345e]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
        {filteredEvents.map((event) => (
          <button
            key={event.id}
            onClick={() => navigate(`/app/events/${event.id}`)}
            className="w-full bg-white dark:bg-[#2c2140] rounded-3xl overflow-hidden border border-[#eee3dc] dark:border-[#44345e] shadow-sm text-left transition"
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
                <h2 className="text-lg font-semibold text-[#220640] dark:text-white">
                  {event.title}
                </h2>

                <span className="bg-[#e0b834] text-[#2e104d] text-xs px-3 py-1 rounded-full h-fit">
                  {event.category}
                </span>
              </div>

              <p className="flex items-center gap-3 text-[#85699e] dark:text-[#d5c3ef]">
                <Calendar size={19} />
                {event.event_date}
              </p>

              <p className="flex items-center gap-3 text-[#85699e] dark:text-[#d5c3ef]">
                <MapPin size={19} />
                {event.location}
              </p>
            </div>
          </button>
        ))}

        {filteredEvents.length === 0 && (
          <p className="text-center text-[#84699d] dark:text-[#d5c3ef] py-10">
            {t.noEventsFound}
          </p>
        )}
      </div>
    </section>
  );
};