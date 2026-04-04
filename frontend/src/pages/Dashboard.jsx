import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

// ── Circular SVG gauge (Trust Score) ────────────────────────────────────────
function CircularGauge({ value = 0.82, size = 120, label = "Trust Score" }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - value * circumference;
  const percentage = Math.round(value * 100);
  const color = value >= 0.7 ? "#10b981" : value >= 0.4 ? "#f59e0b" : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#1e293b" strokeWidth="10" />
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-white">{percentage}%</span>
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-500 text-center">{label}</p>
    </div>
  );
}

// ── Risk progress bar ────────────────────────────────────────────────────────
function RiskBar({ score = 0.42 }) {
  const pct = Math.round(score * 100);
  const isLow = score < 0.35;
  const isMed = score >= 0.35 && score < 0.65;
  const color = isLow ? "bg-emerald-500" : isMed ? "bg-amber-400" : "bg-rose-500";
  const labelColor = isLow ? "text-emerald-400" : isMed ? "text-amber-400" : "text-rose-400";
  const label = isLow ? "Low Risk" : isMed ? "Medium Risk" : "High Risk";

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-bold ${labelColor}`}>{label}</span>
        <span className="text-2xl font-black text-white">{score.toFixed(2)}</span>
      </div>
      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-600 mt-1">
        <span>0.0 Safe</span>
        <span>0.5 Moderate</span>
        <span>1.0 High</span>
      </div>
    </div>
  );
}

// ── AQI Badge ────────────────────────────────────────────────────────────────
function AqiBadge({ aqi = 145 }) {
  const isGood = aqi < 100;
  const isMod = aqi >= 100 && aqi < 200;
  const isPoor = aqi >= 200;
  const color = isGood ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    : isMod ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
    : "bg-rose-500/20 text-rose-400 border-rose-500/30";
  const label = isGood ? "Good" : isMod ? "Moderate" : "Poor";

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${color}`}>
      <span className="w-2 h-2 rounded-full bg-current" />
      AQI {aqi} · {label}
    </span>
  );
}

// ── Platform badge ────────────────────────────────────────────────────────────
const platformMeta = {
  swiggy: { color: "bg-orange-500/20 text-orange-400 border-orange-500/30", emoji: "🧡" },
  zomato: { color: "bg-red-500/20 text-red-400 border-red-500/30", emoji: "❤️" },
  zepto: { color: "bg-purple-500/20 text-purple-400 border-purple-500/30", emoji: "💜" },
  bigbasket: { color: "bg-green-500/20 text-green-400 border-green-500/30", emoji: "💚" },
  default: { color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", emoji: "🔵" },
};

export default function Dashboard() {
  const [worker, setWorker] = useState(null);
  const navigate = useNavigate();

  // Demo AI data (in production: fetch from backend)
  const ai = {
    riskScore: 0.42,
    trustScore: 0.82,
    weeklyPremium: 40,
    recommendedPlan: "Standard",
    rainfall: 22,
    temperature: 28,
    aqi: 145,
    weather: "Moderate Rain",
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("worker"));
    setWorker(data);
  }, []);

  if (!worker) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" style={{ borderWidth: 3 }} />
        <p className="text-slate-500 text-sm">Loading your dashboard...</p>
      </div>
    </div>
  );

  const platform = worker.platform?.toLowerCase() || "default";
  const pm = platformMeta[platform] || platformMeta.default;
  const platformLabel = worker.platform ? worker.platform.charAt(0).toUpperCase() + worker.platform.slice(1) : "Rider";

  return (
    <AppLayout worker={worker}>
      <div className="animate-fade-in">

        {/* Page header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">AI-powered gig worker protection overview</p>
        </div>

        {/* Desktop 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── LEFT COLUMN ─────────────────────────────────────── */}
          <div className="lg:col-span-1 space-y-5">

          {/* Rider Profile Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pm.bg || 'from-indigo-500 to-blue-600'} flex items-center justify-center text-white font-black text-xl shadow-lg flex-shrink-0`}>
                {worker.name?.charAt(0).toUpperCase() || "R"}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-white truncate">{worker.name || "Rider"}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${pm.badge}`}>
                    {pm.emoji} {platformLabel}
                  </span>
                  <span className="text-slate-500 text-xs flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {worker.city || "City not set"}
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/25 rounded-full text-xs font-bold text-emerald-400 flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
          </div>

          {/* Environment Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Live Environment</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-800/60 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">🌧️</div>
                <p className="text-white font-bold text-sm">{ai.rainfall}mm</p>
                <p className="text-slate-500 text-xs">Rainfall</p>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">🌡️</div>
                <p className="text-white font-bold text-sm">{ai.temperature}°C</p>
                <p className="text-slate-500 text-xs">Temp</p>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">💨</div>
                <p className="text-white font-bold text-sm">{ai.aqi}</p>
                <p className="text-slate-500 text-xs">AQI</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <AqiBadge aqi={ai.aqi} />
              <span className="text-slate-500 text-xs">{ai.weather} · AI-monitored</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Activate Plan", emoji: "🛡️", path: "/buy-insurance" },
                { label: "Trigger & Claims", emoji: "⚡", path: "/claims" },
                { label: "Trust Analysis", emoji: "🔐", path: "/trust-analysis" },
                { label: "My Profile", emoji: "👤", path: "/profile" },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-slate-800 hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-200 text-center"
                >
                  <span className="text-2xl">{action.emoji}</span>
                  <span className="text-xs font-semibold text-slate-400">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          </div>{/* end LEFT col */}

          {/* ── RIGHT COLUMN (2 cols wide) ────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">

          {/* Risk Score (PROMINENT) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Risk Score</p>
                <p className="text-xs text-slate-600 mt-0.5">Based on live environmental data</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <RiskBar score={ai.riskScore} />
          </div>

          {/* Trust Score (PROMINENT) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-6">
              <CircularGauge value={ai.trustScore} size={110} label="Fraud Protection" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Trust Score</p>
                <h2 className="text-4xl font-black text-white">{Math.round(ai.trustScore * 100)}%</h2>
                <p className="text-emerald-400 text-sm font-semibold mt-1">✓ Verified Identity</p>
                <p className="text-slate-500 text-xs mt-1">Multi-signal fraud detection active</p>
                <button
                  onClick={() => navigate("/trust-analysis")}
                  className="mt-3 text-xs text-indigo-400 font-semibold hover:text-indigo-300 transition-colors flex items-center gap-1"
                >
                  View full analysis →
                </button>
              </div>
            </div>
          </div>

          {/* Secondary stat cards */}
          <div className="grid grid-cols-2 gap-5">
            {/* Weekly Premium */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-xs text-slate-500 font-medium">Weekly Premium</p>
              <p className="text-3xl font-black text-white mt-1">₹{ai.weeklyPremium}</p>
              <p className="text-xs text-slate-600 mt-1">Auto-adjusts with risk score</p>
            </div>

            {/* Recommended Plan */}
            <div className="bg-gradient-to-br from-indigo-600/30 to-blue-600/20 border border-indigo-500/30 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-xs text-indigo-300 font-medium">AI Recommends</p>
              <p className="text-2xl font-black text-white mt-1">{ai.recommendedPlan}</p>
              <span className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-full border border-indigo-400/30">
                ✦ Best fit for your risk
              </span>
            </div>
          </div>

          {/* AI Insight Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-indigo-500/20 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">AI Insight</p>
              <p className="text-sm text-slate-300 mt-1">
                Rainfall at <strong className="text-white">22mm</strong> has exceeded the trigger threshold. Your Standard plan is eligible for a <strong className="text-emerald-400">₹680 payout</strong>.
              </p>
            </div>
            <button
              onClick={() => navigate("/claims")}
              className="flex-shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors"
            >
              View Claim →
            </button>
          </div>

          </div>{/* end RIGHT col */}

        </div>{/* end grid */}
      </div>
    </AppLayout>
  );
}