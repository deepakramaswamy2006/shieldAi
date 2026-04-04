import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

const platformMeta = {
  swiggy: { color: "from-orange-500 to-orange-700", badge: "bg-orange-500/20 text-orange-400 border-orange-500/30", emoji: "🧡" },
  zomato: { color: "from-red-500 to-red-700", badge: "bg-red-500/20 text-red-400 border-red-500/30", emoji: "❤️" },
  zepto: { color: "from-purple-500 to-purple-700", badge: "bg-purple-500/20 text-purple-400 border-purple-500/30", emoji: "💜" },
  bigbasket: { color: "from-green-600 to-green-800", badge: "bg-green-500/20 text-green-400 border-green-500/30", emoji: "💚" },
  default: { color: "from-indigo-500 to-blue-700", badge: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", emoji: "🔵" },
};

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-800 last:border-0">
      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-base">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-white capitalize mt-0.5 truncate">{value || "—"}</p>
      </div>
    </div>
  );
}

export default function Profile() {
  const [worker, setWorker] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("worker"));
    setWorker(data);
    setForm(data || {});
  }, []);

  if (!worker) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Loading profile...</p>
      </div>
    </div>
  );

  const initials = worker.name
    ? worker.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const platform = worker.platform?.toLowerCase() || "default";
  const pm = platformMeta[platform] || platformMeta.default;
  const platformLabel = worker.platform
    ? worker.platform.charAt(0).toUpperCase() + worker.platform.slice(1)
    : "Platform";

  const stats = [
    { label: "Active Plan", value: "Standard Shield", icon: "🛡️", color: "text-indigo-400" },
    { label: "Weekly Premium", value: "₹40", icon: "💳", color: "text-emerald-400" },
    { label: "Trust Score", value: "82%", icon: "🔐", color: "text-emerald-400" },
    { label: "Risk Score", value: "0.42 Medium", icon: "⚡", color: "text-amber-400" },
  ];

  const activityItems = [
    { icon: "🛡️", title: "Standard Plan activated", time: "2 hours ago", color: "text-indigo-400" },
    { icon: "✅", title: "Identity verified successfully", time: "1 day ago", color: "text-emerald-400" },
    { icon: "💰", title: "Claim payout: ₹680", time: "3 days ago", color: "text-emerald-400" },
    { icon: "⚡", title: "Risk score updated to 0.42", time: "1 week ago", color: "text-amber-400" },
  ];

  return (
    <AppLayout worker={worker}>
      <div className="animate-fade-in">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <p className="text-slate-500 text-sm mt-1">View and manage your account details</p>
        </div>

        {/* Two-column desktop grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── LEFT COLUMN (Profile card + Stats) ── */}
          <div className="lg:col-span-1 space-y-5">

            {/* Profile Hero Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              {/* Banner */}
              <div className={`h-24 bg-gradient-to-br ${pm.color} relative`}>
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              </div>
              {/* Avatar + info */}
              <div className="px-5 pb-5 relative">
                {/* Avatar */}
                <div className="absolute -top-8 left-5">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pm.color} flex items-center justify-center text-white font-black text-2xl shadow-xl border-4 border-slate-900`}>
                    {initials}
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex justify-end pt-3 mb-2">
                  <button
                    onClick={() => setEditing(!editing)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {editing ? "Cancel" : "Edit"}
                  </button>
                </div>

                <div className="mt-1">
                  <h2 className="text-xl font-bold text-white">{worker.name || "Rider"}</h2>
                  <p className="text-slate-500 text-sm mt-0.5">{worker.mobile}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${pm.badge}`}>
                    {pm.emoji} {platformLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border bg-emerald-500/15 text-emerald-400 border-emerald-500/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Insurance Summary</p>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="bg-slate-800/60 rounded-xl p-3">
                    <span className="text-lg">{s.icon}</span>
                    <p className={`text-base font-black mt-1 ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Badges */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Verification Status</p>
              <div className="space-y-2.5">
                {[
                  { label: "Mobile Verified", done: true },
                  { label: "Identity Verified", done: true },
                  { label: "Platform Linked", done: !!worker.platform },
                  { label: "Bank Account", done: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">{item.label}</span>
                    {item.done ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Verified
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-400">Pending</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (Details + Activity) ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Personal Information */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Personal Information</p>
                {editing && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(false)}
                      className="btn-primary py-1.5 px-4 text-xs"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              {editing ? (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Full Name", icon: "👤", type: "text" },
                    { key: "userId", label: "User ID", icon: "🪪", type: "text", disabled: true },
                    { key: "mobile", label: "Mobile Number", icon: "📱", type: "tel" },
                    { key: "city", label: "City", icon: "📍", type: "text" },
                    { key: "platform", label: "Platform", icon: "🚴", type: "text" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        {field.icon} {field.label}
                      </label>
                      <input
                        type={field.type}
                        className="input"
                        value={form[field.key] || ""}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-2">
                  <InfoRow icon="👤" label="Full Name" value={worker.name} />
                  <InfoRow icon="🪪" label="User ID" value={worker.userId || worker._id?.slice(-8).toUpperCase()} />
                  <InfoRow icon="📱" label="Mobile Number" value={worker.mobile} />
                  <InfoRow icon="📍" label="City" value={worker.city} />
                  <InfoRow icon="🚴" label="Platform" value={platformLabel} />
                </div>
              )}
            </div>

            {/* Account Security */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Account Security</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button className="flex items-center gap-3 p-4 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-left transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/25 transition-colors">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Change Password</p>
                    <p className="text-xs text-slate-500">Last changed 30 days ago</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-4 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-left transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/25 transition-colors">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Two-Factor Auth</p>
                    <p className="text-xs text-emerald-400 font-medium">Enabled</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Recent Activity</p>
              <div className="space-y-3">
                {activityItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-2.5 border-b border-slate-800 last:border-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 text-base">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${item.color}`}>{item.title}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-5">
              <p className="text-xs font-semibold text-rose-400/70 uppercase tracking-wider mb-4">Danger Zone</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Delete Account</p>
                  <p className="text-xs text-slate-500 mt-0.5">Permanently remove your account and all data</p>
                </div>
                <button className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-sm font-semibold rounded-xl transition-all">
                  Delete
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
