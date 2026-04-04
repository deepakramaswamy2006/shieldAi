import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

const STEPS = ["Processing", "Approved", "Paid"];

function TriggerBadge({ active, label, threshold, current, icon }) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300
      ${active
        ? "bg-rose-500/10 border-rose-500/30"
        : "bg-slate-800/60 border-slate-700/50"
      }`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0
        ${active ? "bg-rose-500/20" : "bg-slate-700/60"}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">Threshold: {threshold}</p>
        <div className="mt-2 w-full bg-slate-800 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${active ? "bg-rose-500" : "bg-slate-600"}`}
            style={{ width: `${Math.min(100, (current / parseFloat(threshold)) * 100)}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-1">Current: <span className={active ? "text-rose-400 font-semibold" : "text-slate-400"}>{current}</span></p>
      </div>
      <div className="flex-shrink-0">
        {active ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full text-xs font-bold text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            TRIGGERED
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-700/50 border border-slate-600/50 rounded-full text-xs font-medium text-slate-500">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            Monitoring
          </span>
        )}
      </div>
    </div>
  );
}

export default function Claims() {
  const [worker, setWorker] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 0=processing, 1=approved, 2=paid

  // Demo data
  const claimData = {
    rainfallCurrent: 22,
    rainfallThreshold: "20mm",
    rainfallTriggered: true,
    aqiCurrent: 145,
    aqiThreshold: "300 AQI",
    aqiTriggered: false,
    incomeLoss: 850,
    payout: 680,
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("worker"));
    setWorker(data);
  }, []);

  if (!worker) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const anyTriggered = claimData.rainfallTriggered || claimData.aqiTriggered;

  return (
    <AppLayout worker={worker}>
      <div className="animate-fade-in">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-white">Triggers & Claims</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time parametric trigger monitoring</p>
        </div>

        {/* Desktop 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          
          {/* ── LEFT COLUMN (Alerts & Conditions) ── */}
          <div className="space-y-5">
            {/* Trigger Alert Banner */}
        {anyTriggered && (
          <div className="flex items-center gap-3 px-4 py-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-rose-300 font-bold text-sm">Trigger Activated</p>
              <p className="text-slate-400 text-xs">Rainfall threshold exceeded — claim processing initiated</p>
            </div>
            <span className="ml-auto flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-500 rounded-full text-xs font-bold text-white shadow-lg shadow-rose-500/30">
              ⚠ Active
            </span>
          </div>
        )}

        {/* Trigger Conditions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Trigger Conditions</p>
          <TriggerBadge
            active={claimData.rainfallTriggered}
            label="Rainfall Threshold"
            icon="🌧️"
            threshold={claimData.rainfallThreshold}
            current={`${claimData.rainfallCurrent}mm`}
          />
          <TriggerBadge
            active={claimData.aqiTriggered}
            label="Air Quality Index"
            icon="💨"
            threshold={claimData.aqiThreshold}
            current={`${claimData.aqiCurrent} AQI`}
          />
        </div>

          </div> {/* end LEFT column */}

          {/* ── RIGHT COLUMN (Financial Impact & Tracker) ── */}
          <div className="space-y-5">
            {/* Financial Impact */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Financial Impact</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/60 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <span className="text-xs text-slate-500 font-medium">Predicted Loss</span>
                  </div>
                  <p className="text-2xl font-black text-rose-400">₹{claimData.incomeLoss}</p>
                  <p className="text-xs text-slate-600 mt-1">Estimated income loss</p>
                </div>
                <div className={`rounded-xl p-4 ${anyTriggered ? "payout-glow bg-emerald-500/10 border border-emerald-500/20" : "bg-slate-800/60"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-emerald-300 font-medium">Final Payout</span>
                  </div>
                  <p className="text-2xl font-black text-emerald-400">₹{claimData.payout}</p>
                  <p className="text-xs text-slate-600 mt-1">AI-calculated payout</p>
                </div>
              </div>
            </div>

            {/* Status Tracker */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5">Claim Status</p>
          <div className="flex items-center">
            {STEPS.map((step, i) => {
              const isDone = i <= currentStep;
              const isCurrent = i === currentStep;
              return (
                <div key={step} className="flex-1 flex flex-col items-center relative">
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div className="absolute top-4 left-1/2 w-full h-0.5 bg-slate-800">
                      {isDone && i < currentStep && (
                        <div className="h-full bg-emerald-500 step-progress" />
                      )}
                    </div>
                  )}
                  {/* Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-500 flex-shrink-0
                    ${isCurrent
                      ? "bg-indigo-500 border-2 border-indigo-400 shadow-lg shadow-indigo-500/40"
                      : isDone
                      ? "bg-emerald-500 border-2 border-emerald-400"
                      : "bg-slate-800 border-2 border-slate-700"
                    }`}
                  >
                    {isDone && !isCurrent ? (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : isCurrent ? (
                      <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-600" />
                    )}
                  </div>
                  {/* Label */}
                  <p className={`mt-2 text-xs font-semibold text-center ${
                    isCurrent ? "text-indigo-400" : isDone ? "text-emerald-400" : "text-slate-600"
                  }`}>{step}</p>
                  {isCurrent && (
                    <p className="text-xs text-slate-600 mt-0.5">In progress</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation for demo */}
          <div className="mt-5 flex gap-2">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className="flex-1 py-2 text-xs font-semibold text-slate-500 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-30"
              disabled={currentStep === 0}
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(2, currentStep + 1))}
              className="flex-1 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-colors disabled:opacity-30"
              disabled={currentStep === 2}
            >
              Advance →
            </button>
          </div>
        </div>

        {/* Payout highlight */}
        {currentStep === 2 && (
          <div className="payout-glow bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 flex flex-col items-center gap-3 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/40">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-black text-emerald-400">₹{claimData.payout} Paid!</h3>
              <p className="text-slate-400 text-sm mt-1">Claim processed successfully · No documents needed</p>
            </div>
          </div>
        )}
            </div> {/* end RIGHT column */}

          </div> {/* end wrapper grid */}
      </div>
    </AppLayout>
  );
}
