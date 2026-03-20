const express = require("express");
const router = express.Router();
const Worker = require("../models/Worker");

// GET ALL WORKERS
router.get("/workers", async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;