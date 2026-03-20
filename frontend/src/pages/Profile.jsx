import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

export default function Profile() {
  const [worker, setWorker] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("worker"));
    setWorker(data);
  }, []);

  if (!worker) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const initials = worker.name
    ? worker.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const fields = [
    { label: "Full Name", value: worker.name, icon: "👤" },
    { label: "Mobile Number", value: worker.mobile, icon: "📱" },
    { label: "City", value: worker.city, icon: "📍" },
    { label: "Platform", value: worker.platform, icon: "🚴" },
  ];

  return (
    <AppLayout worker={worker}>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage your personal details</p>
      </div>

      {/* Profile Hero Card */}
      <div className="bg-gradient-to-br from-gray-900 to-blue-950 rounded-2xl p-6 mb-6 text-white shadow-xl flex flex-col sm:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-3xl font-bold shadow-lg shadow-orange-500/30 flex-shrink-0">
          {initials}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold">{worker.name}</h2>
          <p className="text-gray-400 text-sm mt-1">{worker.mobile}</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
            <span className="bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs px-3 py-1 rounded-full font-medium capitalize">
              {worker.platform} Partner
            </span>
            <span className="bg-green-500/20 text-green-300 border border-green-500/30 text-xs px-3 py-1 rounded-full font-medium">
              ✓ Active Policy
            </span>
          </div>
        </div>
        {/* Edit button */}
        <div className="sm:ml-auto">
          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.label} className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                <span>{field.icon}</span>
                {field.label}
              </label>
              {editing ? (
                <input
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  defaultValue={field.value}
                />
              ) : (
                <p className="bg-gray-50 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-800 capitalize">
                  {field.value}
                </p>
              )}
            </div>
          ))}
        </div>

        {editing && (
          <div className="mt-5 flex gap-3">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-md shadow-orange-200">
              Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Insurance Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Insurance Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Plan", value: "Basic Shield", color: "text-orange-600" },
            { label: "Weekly Premium", value: "₹50", color: "text-blue-600" },
            { label: "Status", value: "Active", color: "text-green-600" },
          ].map((item) => (
            <div key={item.label} className="text-center bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 font-medium mb-1">{item.label}</p>
              <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

    </AppLayout>
  );
}
