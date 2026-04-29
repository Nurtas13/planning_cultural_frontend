import { useNavigate } from "react-router-dom";
import welcomeImage from "../../assets/welcome.jpg";

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-[#f8f3ef] flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-5 md:p-8">
          <img
            src={welcomeImage}
            alt="Welcome"
            className="w-full h-64 md:h-full min-h-[320px] object-cover rounded-[24px]"
          />
        </div>

        <div className="flex flex-col justify-center p-8 md:p-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5f3d8c]">
            CulturHub
          </h1>

          <p className="mt-5 text-xl text-[#614878]">
            Discover and create cultural moments
          </p>

          <p className="mt-4 text-[#927da8] leading-7">
            Connect with concerts, exhibitions, theater plays, festivals, and
            workshops in your area.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-8 w-full md:w-56 h-14 rounded-2xl bg-[#643b93] text-white font-semibold text-lg hover:bg-[#563483] transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};