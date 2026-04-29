import {
  AlignLeft,
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/eventsApi";

export const Events = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Concert");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [error, setError] = useState("");

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !eventDate || !eventTime || !location || !description) {
      setError("Please fill all required fields");
      return;
    }

    try {
      await createEvent({
        title,
        description,
        category,
        location,
        event_date: eventDate,
        event_time: eventTime,
        image_url: imageUrl || null,
        price: price ? Number(price) : 0,
        max_participants: maxParticipants ? Number(maxParticipants) : undefined,
      });

      navigate("/app/home");
    } catch {
      setError("Failed to create event");
    }
  };

  return (
    <section className="h-full flex flex-col bg-[#fbf7f3]">
      <div className="shrink-0 flex items-center gap-4 px-6 py-5 bg-[#fbf7f3] border-b border-[#eadfd7]">
        <button onClick={() => navigate(-1)} className="text-[#84699d]">
          <ArrowLeft size={26} />
        </button>

        <div>
          <h1 className="text-2xl font-semibold text-[#563483]">
            Create Event
          </h1>
          <p className="text-[#84699d]">Share your cultural moment</p>
        </div>
      </div>

      <form
        onSubmit={handleCreateEvent}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-5 pb-28"
      >
        <div>
          <p className="form-label">Event Image URL</p>
          <div className="relative">
            <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8b77a3]" />
            <input
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setError("");
              }}
              placeholder="https://images.unsplash.com/..."
              className="input input-with-icon"
            />
          </div>
        </div>

        <div>
          <p className="form-label">Event Title</p>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            placeholder="e.g., Summer Jazz Festival"
            className="input"
          />
        </div>

        <div>
          <p className="form-label">Category</p>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setError("");
            }}
            className="input"
          >
            <option value="Concert">Concert</option>
            <option value="Exhibition">Exhibition</option>
            <option value="Theater">Theater</option>
            <option value="Festival">Festival</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="form-label">Date</p>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b77a3]" />
              <input
                type="date"
                value={eventDate}
                onChange={(e) => {
                  setEventDate(e.target.value);
                  setError("");
                }}
                className="input input-with-icon"
              />
            </div>
          </div>

          <div>
            <p className="form-label">Time</p>
            <input
              type="time"
              value={eventTime}
              onChange={(e) => {
                setEventTime(e.target.value);
                setError("");
              }}
              className="input"
            />
          </div>
        </div>

        <div>
          <p className="form-label">Location</p>
          <div className="relative">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8b77a3]" />
            <input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setError("");
              }}
              placeholder="Enter location"
              className="input input-with-icon"
            />
          </div>
        </div>

        <div>
          <p className="form-label">Description</p>
          <div className="relative">
            <AlignLeft className="absolute left-5 top-5 text-[#8b77a3]" />
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError("");
              }}
              placeholder="Describe your event..."
              className="input textarea-with-icon min-h-32 resize-none"
            />
          </div>
        </div>

        <div>
          <p className="form-label">Ticket Price</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            className="input"
          />
        </div>

        <div>
          <p className="form-label">Max Participants</p>
          <input
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            placeholder="300"
            className="input"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl p-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full h-16 rounded-2xl bg-[#643b93] text-white font-semibold text-lg shadow-lg"
        >
          Publish Event
        </button>
      </form>
    </section>
  );
};