import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        mobile,
        password,
      });

      alert("Login Success");
      localStorage.setItem("worker", JSON.stringify(res.data.worker));
      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Worker Login</h2>

        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full p-2 border mb-4 rounded"
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Sign In
        </button>

        <p
          className="mt-4 text-center text-blue-600 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}