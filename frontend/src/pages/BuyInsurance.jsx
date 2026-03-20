import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

const plans = [
  {
    name: "Basic Shield",
    price: "₹50/week",
    features: ["₹3,000 earnings coverage", "Accident protection", "Basic support"],
    highlight: false,
  },
  {
    name: "Pro Shield",
    price: "₹100/week",
    features: ["₹7,000 earnings coverage", "Accident + Health", "Priority support", "Hospital cashback"],
    highlight: true,
  },
  {
    name: "Premium Shield",
    price: "₹200/week",
    features: ["₹15,000 earnings coverage", "Full health insurance", "24/7 support", "Family benefits"],
    highlight: false,
  },
];

export default function BuyInsurance() {
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("worker"));
    setWorker(data);
  }, []);

  if (!worker) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <AppLayout worker={worker}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Buy Insurance</h1>
        <p className="text-sm text-gray-500 mt-1">Choose a plan that fits your lifestyle</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-6 flex flex-col shadow-sm border transition-all hover:-translate-y-1 hover:shadow-lg duration-200
              ${plan.highlight
                ? "bg-gradient-to-b from-orange-500 to-orange-600 text-white border-orange-400"
                : "bg-white text-gray-800 border-gray-100"
              }`}
          >
            {plan.highlight && (
              <span className="text-xs font-bold bg-white/20 text-white rounded-full px-3 py-1 self-start mb-3">
                ⭐ Most Popular
              </span>
            )}
            <h3 className={`text-lg font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
            <p className={`text-2xl font-extrabold mt-2 mb-4 ${plan.highlight ? "text-white" : "text-orange-500"}`}>{plan.price}</p>
            <ul className="flex-1 space-y-2 mb-6">
              {plan.features.map((f) => (
                <li key={f} className={`text-sm flex items-center gap-2 ${plan.highlight ? "text-orange-100" : "text-gray-600"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all
                ${plan.highlight
                  ? "bg-white text-orange-600 hover:bg-orange-50"
                  : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
            >
              Get {plan.name}
            </button>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
