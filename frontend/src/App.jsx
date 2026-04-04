import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Claims from "./pages/Claims";
import BuyInsurance from "./pages/BuyInsurance";
import TrustAnalysis from "./pages/TrustAnalysis";
import Payment from "./pages/Payment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/buy-insurance" element={<BuyInsurance />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/trust-analysis" element={<TrustAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;