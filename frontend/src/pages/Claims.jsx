import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

export default function Claims() {
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
        <h1 className="text-2xl font-bold text-gray-800">My Claims</h1>
        <p className="text-sm text-gray-500 mt-1">Track and manage your insurance claims</p>
      </div>

      {/* Empty state */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Claims Yet</h3>
        <p className="text-gray-400 text-sm max-w-sm">
          You haven't filed any insurance claims yet. When you do, they'll appear here.
        </p>
        <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-md shadow-orange-200">
          File a Claim
        </button>
      </div>
    </AppLayout>
  );
}
