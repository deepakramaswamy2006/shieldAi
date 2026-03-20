const mongoose = require("mongoose");

// Cache the connection across serverless function invocations
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // If already connected, return the existing connection
  if (cached.conn) return cached.conn;

  // If a connection is in progress, wait for it
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,  // Don't buffer commands when disconnected
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
