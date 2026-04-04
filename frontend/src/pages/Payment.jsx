import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

export default function Payment() {
  const [worker, setWorker] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const location = useLocation();
  const navigate = useNavigate();

  const plan = location.state?.plan || { id: "standard", name: "Standard Plan", price: "₹40", period: "/week" };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("worker"));
    if (!data) {
      navigate("/");
    } else {
      setWorker(data);
    }
  }, [navigate]);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    }, 2000);
  };

  if (!worker) return null;

  return (
    <AppLayout worker={worker}>
      <div className="max-w-2xl mx-auto animate-fade-in space-y-5">
        {/* Header */}
        <div className="mb-5 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Payment Checkout</h1>
            <p className="text-slate-500 text-sm mt-0.5">Secure payment processing</p>
          </div>
        </div>

        {success ? (
          <div className="payout-glow bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 flex flex-col items-center gap-4 text-center mt-10">
            <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/40">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-emerald-400 mb-2">Payment Successful!</h2>
              <p className="text-slate-400">Your {plan.name} has been activated.</p>
              <p className="text-xs text-slate-500 mt-2">Redirecting to Dashboard...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: Summary */}
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-5">
                <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-4">Order Summary</p>
                <div className="flex items-start justify-between pb-4 border-b border-white/5">
                  <div>
                    <p className="text-lg font-bold text-white mb-1">{plan.name}</p>
                    <p className="text-sm text-slate-400">ShieldAI Protection Plan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-white">{plan.price}</p>
                    <p className="text-xs text-slate-500">{plan.period}</p>
                  </div>
                </div>
                <div className="pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>{plan.price}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>GST (18%)</span>
                    <span>₹0 (Included)</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="font-bold text-white">Total Amount</span>
                  <span className="text-xl font-black text-indigo-400">{plan.price}</span>
                </div>
              </div>

              {/* Secure Badge */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400/80 bg-emerald-500/5 py-3 rounded-xl border border-emerald-500/10">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure 256-bit SSL Encryption
              </div>
            </div>

            {/* Right: Payment Method */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Select Payment Method</p>
              
              <div className="space-y-3 flex-1">
                {[
                  { id: "upi", label: "UPI", icon: "📱", desc: "Google Pay, PhonePe, Paytm" },
                  { id: "card", label: "Credit / Debit Card", icon: "💳", desc: "Visa, MasterCard, RuPay" },
                  { id: "netbanking", label: "NetBanking", icon: "🏦", desc: "All major Indian banks" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? "bg-indigo-500/10 border-indigo-500 text-white"
                        : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-center relative">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="text-2xl">{method.icon}</div>
                    <div>
                      <p className="text-sm font-bold">{method.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Action */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full btn-primary py-3.5 text-sm flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing Payment...</>
                  ) : (
                    <>Pay {plan.price}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
