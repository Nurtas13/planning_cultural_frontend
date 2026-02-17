import { useNavigate } from "react-router-dom";
import welcomeImage from "../../../assets/welcome.jpg";

export const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf7f6] p-4">
      {/* Карточка */}
      <div className="bg-white rounded-3xl shadow-lg max-w-sm w-full flex flex-col items-center p-6">
        {/* Изображение */}
        <img
          src={welcomeImage}
          alt="Welcome"
          className="w-full h-56 object-cover rounded-2xl mb-6"
        />

        {/* Текст */}
        <h1 className="text-xl lg:text-2xl font-semibold text-[#5b3a87] mb-2">CulturHub</h1>
        <p className="text-gray-500 text-center mb-2">
          Discover and create cultural moments
        </p>
        <p className="text-gray-400 text-sm text-center mb-6">
          Connect with concerts, exhibitions, theater plays, festivals, and workshops in your area
        </p>

        {/* Кнопка */}
        <button
          onClick={handleGetStarted}
          className="bg-[#5b3a87] text-white font-semibold py-3 w-full rounded-2xl hover:bg-[#4e3175] transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
