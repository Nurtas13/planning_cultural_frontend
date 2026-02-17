import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }
    alert(`Logged in as ${email}`);
  };

  const handleBack = () => navigate("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f7f6] p-4">
      <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg bg-white rounded-3xl shadow-xl p-6 space-y-6">

        {/* Back */}
        <button
          onClick={handleBack}
          className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm lg:text-base"
        >
          ← Back
        </button>

        {/* Заголовок */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#5b3a87]">Welcome Back</h2>
          <p className="text-gray-500 text-sm lg:text-base">Sign in to continue your cultural journey</p>
        </div>

        {/* Форма */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-3 py-3 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b3a87] placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-3 py-3 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b3a87] placeholder-gray-400"
            />
          </div>

          <button type="button" className="text-sm lg:text-base text-[#5b3a87] hover:underline text-left w-full">
            Forgot password?
          </button>

          <button
            type="submit"
            className="w-full py-3 bg-[#5b3a87] text-white font-semibold rounded-2xl shadow-lg hover:bg-[#4e3175] transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 text-gray-400 text-sm lg:text-base">
          <div className="flex-1 border-t border-gray-300"></div>
          <span>Or continue with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-2xl py-2 shadow-sm hover:bg-gray-100 transition text-sm lg:text-base">
            Google
          </button>

          <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-2xl py-2 shadow-sm hover:bg-gray-100 transition text-sm lg:text-base">
            Facebook
          </button>
        </div>

        <p className="text-center text-sm lg:text-base text-gray-500">
          Don't have an account?{" "}
          <button className="text-[#5b3a87] hover:underline">Sign up</button>
        </p>
      </div>
    </div>
  );
};
