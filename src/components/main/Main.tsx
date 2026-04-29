import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Calendar, Home, Menu, Plus, User } from "lucide-react";
import { useState } from "react";

export const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="min-h-dvh bg-[#f8f3ef] flex justify-center">
      <div className="relative w-full max-w-[430px] min-h-dvh bg-[#fbf7f3] overflow-hidden shadow-2xl">
        <main className="h-dvh overflow-y-auto pb-28">
          <Outlet />
        </main>

        <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur border-t border-[#eadfd7] z-40">
          <div className="h-full grid grid-cols-5 items-center px-5">
            <button onClick={() => navigate("/app/home")} className={`flex flex-col items-center gap-1 text-xs ${isActive("home") ? "text-[#5f3d8c]" : "text-[#8b77a3]"}`}>
              <Home size={24} />
              Home
            </button>

            <button onClick={() => navigate("/app/events")} className={`flex flex-col items-center gap-1 text-xs ${isActive("events") ? "text-[#5f3d8c]" : "text-[#8b77a3]"}`}>
              <Calendar size={24} />
              Events
            </button>

            <button onClick={() => navigate("/app/create")} className="mx-auto -mt-8 w-16 h-16 rounded-full bg-[#e4b72f] text-[#2c124d] flex items-center justify-center shadow-xl border-[6px] border-[#fbf7f3]">
              <Plus size={30} strokeWidth={2.5} />
            </button>

            <button onClick={() => navigate("/app/profile")} className={`flex flex-col items-center gap-1 text-xs ${isActive("profile") ? "text-[#5f3d8c]" : "text-[#8b77a3]"}`}>
              <User size={24} />
              Profile
            </button>

            <button
              onClick={() => setShowMore(true)}
              className="flex flex-col items-center gap-1 text-xs text-[#8b77a3]"
            >
              <Menu size={24} />
              More
            </button>
          </div>
        </nav>

        {showMore && (
          <div className="absolute inset-0 bg-black/40 flex items-end z-50">
            <div className="w-full bg-white rounded-t-[30px] p-6">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5" />

              <h2 className="text-2xl font-semibold text-[#563483] mb-4">
                How to use CulturHub
              </h2>

              <div className="space-y-3 text-[#2e104d]">
                <div className="p-4 rounded-2xl bg-[#f8f3ef]">
                  <b>1. Find events</b>
                  <p className="text-sm text-[#84699d] mt-1">
                    Use Home or Events to browse concerts, exhibitions, theater plays and festivals.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8f3ef]">
                  <b>2. Save events</b>
                  <p className="text-sm text-[#84699d] mt-1">
                    Open an event and press the heart icon to add it to Saved Events.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8f3ef]">
                  <b>3. Attend events</b>
                  <p className="text-sm text-[#84699d] mt-1">
                    Press Attend Event to add the event to My Events in your profile.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8f3ef]">
                  <b>4. Create events</b>
                  <p className="text-sm text-[#84699d] mt-1">
                    Press the plus button to publish your own cultural event.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowMore(false)}
                className="w-full h-14 mt-5 rounded-2xl bg-[#643b93] text-white font-semibold"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};