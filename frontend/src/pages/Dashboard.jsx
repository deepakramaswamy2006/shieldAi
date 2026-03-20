import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

const StatCard = ({ title, value, subtitle, icon, from, to }) => (
  <div className={`bg-gradient-to-br ${from} ${to} text-white p-6 rounded-2xl shadow-lg relative overflow-hidden`}>
    <div className="absolute right-4 top-4 opacity-20 text-5xl">{icon}</div>
    <p className="text-sm font-medium opacity-80">{title}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
    {subtitle && <p className="text-xs mt-1 opacity-70">{subtitle}</p>}
  </div>
);

export default function Dashboard() {
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("worker"));
    setWorker(data);
  }, []);

  if (!worker) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading your dashboard...</p>
      </div>
    </div>
  );

  const platformBadgeColor = {
    swiggy: "bg-orange-100 text-orange-700",
    zomato: "bg-red-100 text-red-700",
    blinkit: "bg-yellow-100 text-yellow-700",
    default: "bg-blue-100 text-blue-700",
  };
  const badgeClass = platformBadgeColor[worker.platform?.toLowerCase()] || platformBadgeColor.default;

  return (
    <AppLayout worker={worker}>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Here's an overview of your insurance coverage</p>
      </div>

      {/* Platform badge */}
      <div className="mb-6">
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${badgeClass}`}>
          <span className="w-2 h-2 rounded-full bg-current opacity-60"></span>
          {worker.platform?.charAt(0).toUpperCase() + worker.platform?.slice(1)} Partner
        </span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <StatCard
          title="Weekly Premium"
          value="₹50"
          subtitle="Due every Monday"
          icon="💳"
          from="from-orange-400"
          to="to-orange-600"
        />
        <StatCard
          title="Protected Earnings"
          value="₹3,000"
          subtitle="Coverage this week"
          icon="🛡️"
          from="from-blue-500"
          to="to-blue-700"
        />
        <StatCard
          title="Risk Level"
          value="Medium"
          subtitle="Based on your activity"
          icon="⚡"
          from="from-purple-500"
          to="to-purple-700"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "File a Claim", emoji: "📋", path: "/claims" },
            { label: "Buy Plan", emoji: "🛒", path: "/buy-insurance" },
            { label: "View Profile", emoji: "👤", path: "/profile" },
            { label: "Support", emoji: "💬", path: "#" },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => action.path !== "#" && (window.location.href = action.path)}
              className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="text-2xl">{action.emoji}</span>
              <span className="text-xs font-medium text-gray-600">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Worker details card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-800">Your Policy Summary</h2>
          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">Active</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Mobile", value: worker.mobile, icon: "📱" },
            { label: "City", value: worker.city, icon: "📍" },
            { label: "Platform", value: worker.platform, icon: "🚴" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-lg">{item.icon}</span>
              <div>
                <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800 capitalize">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </AppLayout>
  );
}