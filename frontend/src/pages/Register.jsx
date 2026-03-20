import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    city: "",
    platform: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
  try {
    console.log("Sending data:", form);

    const res = await axios.post(
      `${BASE_URL}/auth/register`,
      form
    );

    console.log("Response:", res.data);

    alert("Registered Successfully");
    navigate("/");
  } catch (err) {
    console.error("Error:", err);
    alert("Registration Failed");
  }
};

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input name="name" placeholder="Name" className="input" onChange={handleChange} />
        <input name="mobile" placeholder="Mobile" className="input" onChange={handleChange} />
        <input name="city" placeholder="City" className="input" onChange={handleChange} />
        <input name="platform" placeholder="Platform" className="input" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" className="input" onChange={handleChange} />

        <button
          onClick={handleRegister}
          className="w-full bg-orange-500 text-white py-2 mt-4 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}