import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    price: "₹20",
    period: "/week",
    coverage: "₹3,000",
    risk: "Low Risk Riders",
    riskColor: "text-emerald-400",
    features: [
      "₹3,000 income coverage",
      "Rainfall trigger (>20mm)",
      "Basic accident protection",
      "Email support",
    ],
    recommended: false,
    accent: "slate",
  },
  {
    id: "standard",
    name: "Standard Plan",
    price: "₹40",
    period: "/week",
    coverage: "₹7,000",
    risk: "Medium Risk Riders",
    riskColor: "text-amber-400",
    features: [
      "₹7,000 income coverage",
      "Rainfall + AQI triggers",
      "Accident + health protection",
      "Priority support 24/7",
      "Hospital cashback",
    ],
    recommended: true,
    accent: "indigo",
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "₹60",
    period: "/week",
    coverage: "₹15,000",
    risk: "High Risk Riders",
    riskColor: "text-rose-400",
    features: [
      "₹15,000 income coverage",
      "All environmental triggers",
      "Full health + accident cover",
      "Dedicated claim manager",
      "Family benefits",
      "Instant payout",
    ],
    recommended: false,
    accent: "purple",
  },
];

function CheckIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function BuyInsurance() {
  const [worker, setWorker] = useState(null);
  const [selected, setSelected] = useState("standard");
  const [activating, setActivating] = useState(false);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("worker"));
    setWorker(data);
  }, []);

  const navigate = useNavigate();

  if (!worker) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const selectedPlan = plans.find((p) => p.id === selected);

  return (
    <AppLayout worker={worker}>
      <div className="animate-fade-in">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Insurance Plans</h1>
          <p className="text-slate-500 text-sm mt-1">AI-matched plans based on your risk profile</p>
        </div>

        {/* AI recommendation banner */}
        <div className="mb-5 flex items-center gap-3 px-4 py-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-indigo-300">AI Recommendation</p>
            <p className="text-sm text-slate-300">Based on your risk score of <strong>0.42</strong>, the <strong className="text-indigo-300">Standard Plan</strong> offers optimal coverage.</p>
          </div>
        </div>

        {/* Plan Cards — 3-col on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          {plans.map((plan) => {
            const isSelected = selected === plan.id;
            const isRec = plan.recommended;
            return (
              <div
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className={`relative rounded-2xl border p-5 cursor-pointer transition-all duration-200
                  ${isSelected
                    ? "bg-indigo-600/15 border-indigo-500/50 glow-indigo"
                    : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70"
                  }`}
              >
                {/* Recommended badge */}
                {isRec && (
                  <div className="absolute -top-3 left-5">
                    <span className="inline-flex items-center gap-1 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-indigo-500/30">
                      ✦ Recommended
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between">
                  {/* Left: Plan info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      {/* Selection indicator */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                        ${isSelected ? "border-indigo-400 bg-indigo-500" : "border-slate-600"}`}
                      >
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <h3 className="text-base font-bold text-white">{plan.name}</h3>
                    </div>
                    <p className={`text-xs font-semibold ml-8 mb-3 ${plan.riskColor}`}>
                      Ideal for {plan.risk}
                    </p>

                    {/* Features (collapse to 3 if not selected) */}
                    <div className="ml-8 space-y-1.5">
                      {plan.features.slice(0, isSelected ? plan.features.length : 3).map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <CheckIcon />
                          <span className="text-sm text-slate-400">{f}</span>
                        </div>
                      ))}
                      {!isSelected && plan.features.length > 3 && (
                        <p className="text-xs text-indigo-400 font-medium">+{plan.features.length - 3} more benefits</p>
                      )}
                    </div>
                  </div>

                  {/* Right: Price */}
                  <div className="text-right pl-4 flex-shrink-0">
                    <div className={`text-3xl font-black ${isSelected ? "text-white" : "text-slate-300"}`}>
                      {plan.price}
                    </div>
                    <div className="text-xs text-slate-500">{plan.period}</div>
                    <div className="mt-2 text-xs font-semibold text-slate-500">Coverage</div>
                    <div className="text-sm font-bold text-emerald-400">{plan.coverage}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          id="activate-btn"
          onClick={() => navigate('/payment', { state: { plan: plans.find((p) => p.id === selected) } })}
          className="btn-primary flex items-center justify-center gap-3 py-4 text-base transition-all hover:scale-[1.01]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="font-bold">Proceed to Payment</span>
        </button>
      </div>
    </AppLayout>
  );
}
