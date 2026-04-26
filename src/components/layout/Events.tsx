import {
  ArrowLeft,
  Image as ImageIcon,
  Calendar,
  MapPin,
  AlignLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Events = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4 bg-white border-b">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-lg font-semibold">Create Event</h2>
          <p className="text-xs text-gray-500">
            Share your cultural moment
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="flex-1 px-4 py-6 space-y-5">

        {/* IMAGE */}
        <div>
          <p className="text-sm mb-2">Event Image</p>
          <div className="w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer">
            <ImageIcon className="w-8 h-8" />
            <p className="text-sm">Upload Image</p>
          </div>
        </div>

        {/* TITLE */}
        <div>
          <p className="text-sm mb-1">Event Title</p>
          <input
            type="text"
            placeholder="Summer Jazz Festival"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <p className="text-sm mb-1">Category</p>
          <select className="w-full border rounded-lg px-3 py-2">
            <option>Select category</option>
            <option>Concert</option>
            <option>Exhibition</option>
            <option>Theater</option>
            <option>Festival</option>
            <option>Workshop</option>
          </select>
        </div>

        {/* DATE + TIME */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm mb-1">Date</p>
            <div className="relative">
              <Calendar className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="date"
                className="w-full border rounded-lg pl-8 py-2"
              />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1">Time</p>
            <input
              type="time"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* LOCATION */}
        <div>
          <p className="text-sm mb-1">Location</p>
          <div className="relative">
            <MapPin className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter location"
              className="w-full border rounded-lg pl-8 py-2"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <p className="text-sm mb-1">Description</p>
          <div className="relative">
            <AlignLeft className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            <textarea
              placeholder="Describe your event..."
              className="w-full border rounded-lg pl-8 pt-2 pb-2 min-h-[100px] resize-none"
            />
          </div>
        </div>

        {/* PRICE */}
        <div>
          <p className="text-sm mb-1">
            Ticket Price <span className="text-gray-400">(optional)</span>
          </p>
          <input
            type="number"
            placeholder="0.00"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="h-20" />
      </div>

      {/* BUTTON */}
      <div className="fixed bottom-0 w-full bg-white border-t p-4">
        <button
          onClick={() => navigate("/app/home")}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium"
        >
          Publish Event
        </button>
      </div>
    </div>
  );
};