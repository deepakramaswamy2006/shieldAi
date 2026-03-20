const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/authRoutes");

// ✅ CORS — allow localhost (dev) and any Vercel deployment (prod)
const corsOptions = {
  origin: function (origin, callback) {
    const allowed = [
      "http://localhost:5173",
      /\.vercel\.app$/,  // allows any *.vercel.app domain
    ];
    if (!origin) return callback(null, true); // allow non-browser requests
    const isAllowed = allowed.some((o) =>
      typeof o === "string" ? o === origin : o.test(origin)
    );
    isAllowed ? callback(null, true) : callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("ShieldAI Backend Running");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ Export for Vercel serverless; only listen when run locally
module.exports = app;
if (require.main === module) {
  const PORT = 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}