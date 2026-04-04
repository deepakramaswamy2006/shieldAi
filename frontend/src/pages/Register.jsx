import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api/api";
import { useNavigate } from "react-router-dom";

const PLATFORMS = ["Swiggy", "Zomato", "Zepto", "BigBasket", "Other"];

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    userId: "",
    city: "",
    platform: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.name || !form.mobile || !form.platform || !form.password) {
      setError("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post(`${BASE_URL}/auth/register`, form);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 animate-slide-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center font-black text-white text-3xl shadow-2xl shadow-indigo-500/40 mb-4">
            S
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-slate-500 text-sm mt-1">Get protected in under 2 minutes</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          {error && (
            <div className="mb-4 px-4 py-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}

          {/* Full Name */}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
            <input
              name="name"
              placeholder="Rajesh Kumar"
              className="input"
              onChange={handleChange}
              value={form.name}
            />
          </div>

          {/* Mobile */}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Mobile Number</label>
            <input
              name="mobile"
              type="tel"
              placeholder="9876543210"
              className="input"
              onChange={handleChange}
              value={form.mobile}
            />
          </div>

          {/* User ID */}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">User ID</label>
            <input
              name="userId"
              type="text"
              placeholder="e.g. rajesh_123"
              className="input"
              onChange={handleChange}
              value={form.userId}
            />
          </div>

          {/* City */}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">City</label>
            <input
              name="city"
              placeholder="Bengaluru, Mumbai, Delhi..."
              className="input"
              onChange={handleChange}
              value={form.city}
            />
          </div>

          {/* Platform Dropdown */}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Delivery Platform</label>
            <select
              id="register-platform"
              name="platform"
              onChange={handleChange}
              value={form.platform}
              className="input"
            >
              <option value="">Select your platform</option>
              {PLATFORMS.map((p) => (
                <option key={p} value={p.toLowerCase()}>{p}</option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create a strong password"
              className="input"
              onChange={handleChange}
              value={form.password}
            />
          </div>

          {/* CTA */}
          <button
            id="register-btn"
            onClick={handleRegister}
            disabled={loading}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
            ) : (
              <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg> Create Account</>
            )}
          </button>

          <p className="mt-4 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <button onClick={() => navigate("/")} className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}