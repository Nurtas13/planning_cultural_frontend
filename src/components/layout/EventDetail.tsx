import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  MapPin,
  Share2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEventById } from "../../api/eventsApi";
import { isEventSaved, toggleSavedEvent } from "../../utils/eventStorage";
import { createRegistration } from "../../api/registrationsApi";
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
  max_participants?: number | null;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1200";

export const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [attendMessage, setAttendMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetchEventById(Number(id))
      .then((data) => {
        setEvent(data);
        setSaved(isEventSaved(data.id));
      })
      .catch(() => {
        setEvent(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-full bg-[#fbf7f3] px-6 py-8 text-[#563483]">
        Loading event...
      </section>
    );
  }

  if (!event) {
    return (
      <section className="min-h-full bg-[#fbf7f3] px-6 py-8">
        <button onClick={() => navigate(-1)} className="mb-6 text-[#563483]">
          ← Back
        </button>
        <h1 className="text-2xl font-semibold text-[#220640]">
          Event not found
        </h1>
      </section>
    );
  }

  const handleSave = () => {
    const result = toggleSavedEvent(event.id);
    setSaved(result);
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: event.title,
        text: event.description || "Cultural event",
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied");
    }
  };
  const handleAttend = async () => {
    try {
      await createRegistration(1, event.id);
      setIsRegistered(true);
      setAttendMessage("You are registered for this event");
    } catch (error) {
      setIsRegistered(true);
      setAttendMessage(
        error instanceof Error ? error.message : "Registration failed"
      );
    }
  };

  return (
    <section className="min-h-full bg-[#fbf7f3]">
      <div className="relative h-72">
        <img
          src={
            event.image_url && event.image_url.includes("images.unsplash.com")
              ? event.image_url
              : fallbackImage
          }
          alt={event.title}
          className="w-full h-full object-cover"
        />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="absolute top-5 right-5 flex gap-3">
          <button
            onClick={handleShare}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <Share2 size={22} />
          </button>

          <button
            onClick={handleSave}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <Heart
              size={22}
              className={saved ? "text-red-500 fill-red-500" : "text-red-500"}
            />
          </button>
        </div>
      </div>

      <div className="px-6 py-7 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#220640]">
            {event.title}
          </h1>
          <p className="flex items-center gap-2 text-[#84699d] mt-2">
            <Users size={19} />
            {event.max_participants || 0}+ max participants
          </p>
        </div>

        <InfoCard
          icon={<Calendar className="text-[#643b93]" />}
          label="Date"
          value={event.event_date}
        />
        <InfoCard
          icon={<Clock className="text-[#e4b72f]" />}
          label="Time"
          value={event.event_time || "Not specified"}
        />
        <InfoCard
          icon={<MapPin className="text-red-500" />}
          label="Location"
          value={event.location}
        />

        <div>
          <h2 className="text-lg font-semibold text-[#220640] mb-3">
            About Event
          </h2>
          <p className="text-[#5d4a70] leading-7">
            {event.description || "No description"}
          </p>
        </div>

        {attendMessage && (
  <div className="rounded-2xl bg-[#f8f3ef] border border-[#eadfd7] p-4 text-[#563483] text-center font-medium">
    {attendMessage}
  </div>
)}

  <button
    onClick={handleAttend}
    disabled={isRegistered}
    className={`w-full h-16 rounded-2xl text-white font-semibold text-lg shadow-lg transition ${
      isRegistered ? "bg-[#8b77a3]" : "bg-[#643b93]"
    }`}
  >
    {isRegistered ? "Registered" : "Attend Event"}
  </button>
      </div>
    </section>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-[#eee3dc] p-4 flex gap-4">
    <div className="w-11 h-11 rounded-xl bg-[#f8f3ef] flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-sm text-[#84699d]">{label}</p>
      <p className="text-[#220640] font-medium mt-1">{value}</p>
    </div>
  </div>
);