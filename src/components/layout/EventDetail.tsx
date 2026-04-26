import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  Share2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const eventDetails = {
  1: {
    image:
      "https://images.unsplash.com/photo-1761173084851-1e5302e931fe?q=80&w=1080",
    title: "Summer Jazz Festival",
    date: "February 20, 2026",
    time: "7:00 PM - 11:00 PM",
    location: "Central Park Amphitheater",
    attendees: 324,
    description:
      "Join us for an unforgettable evening of smooth jazz under the stars. Featuring international artists and local talent.",
    highlights: [
      "Live performances",
      "Food trucks",
      "VIP seating",
      "Meet artists",
    ],
  },
};

export const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const eventId = Number(id);

  const event =
    eventDetails[eventId as keyof typeof eventDetails] ||
    eventDetails[1];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* IMAGE HEADER */}
      <div className="relative h-64">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* ACTIONS */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
            <Heart className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 px-4 py-6 space-y-5">

        <div>
          <h2 className="text-xl font-semibold">{event.title}</h2>

          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Users className="w-4 h-4" />
            {event.attendees}+ attending
          </div>
        </div>

        {/* INFO */}
        <div className="space-y-3">

          <div className="flex gap-3 p-3 bg-white rounded-xl shadow">
            <Calendar className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm">{event.date}</p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-white rounded-xl shadow">
            <Clock className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="text-sm">{event.time}</p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-white rounded-xl shadow">
            <MapPin className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm">{event.location}</p>
            </div>
          </div>

        </div>

        {/* DESCRIPTION */}
        <div>
          <h3 className="font-semibold mb-2">About Event</h3>
          <p className="text-sm text-gray-600">{event.description}</p>
        </div>

        {/* HIGHLIGHTS */}
        <div>
          <h3 className="font-semibold mb-2">Highlights</h3>

          <div className="space-y-2">
            {event.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                {h}
              </div>
            ))}
          </div>
        </div>

        <div className="h-20" />
      </div>

      {/* BUTTON */}
      <div className="fixed bottom-0 w-full bg-white border-t p-4">
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium">
          Attend Event
        </button>
      </div>
    </div>
  );
};