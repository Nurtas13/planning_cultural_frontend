import { ArrowLeft, Facebook, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/usersApi";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const user = await loginUser(email, password);

      // сохраняем пользователя
      localStorage.setItem("userId", String(user.id));

      navigate("/app/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="w-full max-w-[430px] bg-white rounded-[32px] shadow-2xl p-7">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-[#8b77a3] mb-10"
      >
        <ArrowLeft size={22} />
        Back
      </button>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#5f3d8c]">Welcome Back</h1>
        <p className="mt-3 text-[#84699d] text-lg">
          Sign in to continue your cultural journey
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="relative">
          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8b77a3]" />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
                setError("");
            }}
            className="input input-with-icon"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8b77a3]" />
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                setError("");
            }}
            className="input input-with-icon"
          />
        </div>

        <button
          type="button"
          className="text-[#5f3d8c] font-medium hover:underline"
        >
          Forgot password?
        </button>

        {error && (
            <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl p-3">
                {error}
            </div>
        )}

        <button
            type="submit"
            className="w-full h-16 rounded-2xl bg-[#643b93] text-white font-semibold text-lg shadow-lg hover:bg-[#563483] transition"
        >
            Sign In
        </button>
      </form>

      <div className="flex items-center gap-4 my-8 text-[#9a8aaa]">
        <div className="flex-1 border-t border-[#e5dcd5]" />
        <span className="text-sm whitespace-nowrap">Or continue with</span>
        <div className="flex-1 border-t border-[#e5dcd5]" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="h-14 rounded-2xl border border-[#e5dcd5] text-[#2e104d] font-medium hover:bg-[#fbf7f3]">
          Google
        </button>

        <button className="h-14 rounded-2xl border border-[#e5dcd5] text-[#2e104d] font-medium hover:bg-[#fbf7f3] flex items-center justify-center gap-2">
          <Facebook size={20} />
          Facebook
        </button>
      </div>

      <p className="text-center mt-8 text-[#84699d]">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="text-[#5f3d8c] font-semibold hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};