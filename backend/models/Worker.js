const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  city: String,
  platform: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Worker", workerSchema);