const Worker = require("../models/Worker");
const Admin = require("../models/Admin");

// REGISTER WORKER
exports.register = async (req, res) => {
  try {
    const { name, mobile, city, platform, password } = req.body;

    const worker = new Worker({
      name,
      mobile,
      city,
      platform,
      password,
    });

    await worker.save();

    res.json({ message: "Worker registered", worker });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// WORKER LOGIN
exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const worker = await Worker.findOne({ mobile, password });

    if (!worker) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login success", worker });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN LOGIN
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email, password });

    if (!admin) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    res.json({ message: "Admin login success", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};