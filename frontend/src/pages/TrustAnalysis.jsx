import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

// ── Circular Trust Gauge ──────────────────────────────────────────────────────
function TrustGauge({ score = 0.82 }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - score * circumference;
  const pct = Math.round(score * 100);
  const color = score >= 0.7 ? "#10b981" : score >= 0.4 ? "#f59e0b" : "#ef4444";
  const label = score >= 0.7 ? "Trusted" : score >= 0.4 ? "Moderate" : "At Risk";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        {/* Outer glow ring */}
        <div
          className="absolute inset-2 rounded-full opacity-20 blur-xl"
          style={{ background: color }}
        />
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#1e293b" strokeWidth="10" />
          {/* Progress */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-white">{pct}%</span>
          <span className="text-sm font-bold mt-0.5" style={{ color }}>{label}</span>
        </div>
      </div>
      <p className="text-sm text-slate-500 font-medium mt-2">Trust Score (Fraud Protection)</p>
    </div>
  );
}

// ── Signal Card ───────────────────────────────────────────────────────────────
function SignalCard({ icon, label, status, detail, passed }) {
  return (
    <div className={`p-4 rounded-2xl border flex items-start gap-3 transition-all
      ${passed
        ? "bg-emerald-500/8 border-emerald-500/20"
        : "bg-rose-500/8 border-rose-500/20"
      }`}
      style={{ background: passed ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)' }}
    >
      <div className={`text-2xl flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
        ${passed ? "bg-emerald-500/15" : "bg-rose-500/15"}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{detail}</p>
      </div>
      <div className="flex-shrink-0">
        {passed ? (
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrustAnalysis() {
  const [worker, setWorker] = useState(null);
  const [fraudDetected] = useState(false); // set to true to demo fraud alert

  const trustScore = 0.82;

  const signals = [
    {
      icon: "🚴",
      label: "Movement Consistency",
      status: "pass",
      detail: "GPS pattern matches registered delivery zone",
      passed: true,
    },
    {
      icon: "📊",
      label: "Activity Consistency",
      status: "pass",
      detail: "Working hours align with historical baseline",
      passed: true,
    },
    {
      icon: "📱",
      label: "Device Integrity",
      status: "pass",
      detail: "Same device fingerprint — no spoofing detected",
      passed: true,
    },
    {
      icon: "🌦️",
      label: "Environmental Match",
      status: "pass",
      detail: "Claim conditions verified with IMD weather data",
      passed: true,
    },
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("worker"));
    setWorker(data);
  }, []);

  if (!worker) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const passCount = signals.filter((s) => s.passed).length;

  return (
    <AppLayout worker={worker}>
      <div className="animate-fade-in">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-white">Trust Analysis</h1>
          <p className="text-slate-500 text-sm mt-1">AI-powered fraud detection & identity verification</p>
        </div>

        {/* 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          
          {/* ── LEFT COLUMN ── */}
          <div className="xl:col-span-1 space-y-5">
            {/* Gauge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center">
              <TrustGauge score={trustScore} />

              {/* Score breakdown bar */}
              <div className="w-full mt-6 grid grid-cols-4 gap-2">
                {signals.map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1.5">
                    <div className={`w-1.5 rounded-full ${s.passed ? "bg-emerald-500" : "bg-rose-500"}`} style={{ height: 32 }} />
                    <p className="text-xs text-slate-600 text-center leading-tight">{s.label.split(" ")[0]}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-600 mt-3">{passCount}/{signals.length} signals passed</p>
            </div>

            {/* How it works */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">How Our AI Works</p>
              <div className="space-y-3">
                {[
                  { step: "01", title: "Data Collection", desc: "GPS, device, and app activity data collected in real-time" },
                  { step: "02", title: "Pattern Analysis", desc: "ML model compares against your historical behavior baseline" },
                  { step: "03", title: "Environmental Match", desc: "Cross-verified with IMD weather and government AQI data" },
                  { step: "04", title: "Trust Score", desc: "Composite score determines claim eligibility and payout" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-lg flex-shrink-0">{item.step}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="xl:col-span-2 space-y-5">
            
            {/* Verdict */}
            {fraudDetected ? (
              <div className="bg-rose-500/10 border border-rose-500/40 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-rose-300 font-bold text-base">⚠ Fraud Risk Detected</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Anomalous GPS pattern detected. Device location does not match registered delivery zone.
                    Claim has been flagged for manual review.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-500/20 rounded-full text-xs font-bold text-rose-400 border border-rose-500/30">
                      CLAIM SUSPENDED
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-emerald-400 font-bold text-base">✓ Identity Verified</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    All {signals.length} signals passed. No fraud indicators detected. Your claim is eligible for instant payout.
                  </p>
                </div>
              </div>
            )}

            {/* Section label */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Multi-Signal Verification System</p>
              
              {/* Signal breakdown cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {signals.map((signal) => (
                  <SignalCard key={signal.label} {...signal} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
