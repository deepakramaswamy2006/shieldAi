const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./lib/db");
require("dotenv").config();

const app = express();

// ✅ CORS — allow localhost (dev) and any Vercel deployment (prod)
const corsOptions = {
  origin: function (origin, callback) {
    const allowed = [
      "http://localhost:5173",
      /\.vercel\.app$/,
    ];
    if (!origin) return callback(null, true);
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

// ✅ Connect to MongoDB on every request (cached for serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("ShieldAI Backend Running");
});

// ✅ Export for Vercel serverless; only listen when run locally
module.exports = app;
if (require.main === module) {
  const PORT = 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}