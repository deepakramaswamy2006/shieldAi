import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/admin/workers")
      .then((res) => setWorkers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded">
          Total Workers: {workers.length}
        </div>
        <div className="bg-green-500 text-white p-4 rounded">
          Total Payments: 0
        </div>
        <div className="bg-red-500 text-white p-4 rounded">
          Claims: 0
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Workers List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Name</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Platform</th>
            </tr>
          </thead>

          <tbody>
            {workers.map((w) => (
              <tr key={w._id} className="text-center border-t">
                <td>{w.name}</td>
                <td>{w.mobile}</td>
                <td>{w.city}</td>
                <td>{w.platform}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}