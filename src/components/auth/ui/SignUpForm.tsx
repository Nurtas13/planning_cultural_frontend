import { ArrowLeft, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/usersApi";

export const SignUpForm = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const user = await registerUser({
        full_name: fullName,
        email,
        password,
        phone,
      });

      localStorage.setItem("userId", String(user.id));
      setSuccess("Account created successfully");

      setTimeout(() => {
        navigate("/app/home");
      }, 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-[430px] bg-white rounded-[32px] shadow-2xl p-7">
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 text-[#8b77a3] mb-8"
      >
        <ArrowLeft size={22} />
        Back to login
      </button>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#5f3d8c]">Create Account</h1>
        <p className="mt-3 text-[#84699d] text-lg">
          Join cultural events around you
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        <div className="relative">
          <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8b77a3]" />
          <input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setError("");
            }}
            placeholder="Full name"
            className="input input-with-icon"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8b77a3]" />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="your@email.com"
            className="input input-with-icon"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8b77a3]" />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone optional"
            className="input input-with-icon"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8b77a3]" />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Password"
            className="input input-with-icon"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl p-3">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-xl p-3">
            {success}
          </div>
        )}

        <button
          type="submit"
          className="w-full h-16 rounded-2xl bg-[#643b93] text-white font-semibold text-lg shadow-lg"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};