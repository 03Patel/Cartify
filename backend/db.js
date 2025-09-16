const mongoose = require('mongoose');

const MongooseUrl = "mongodb+srv://bit21cs51:fGKQNSjK5WrWanKU@cartify.kt7cddb.mongodb.net/Cartify";

const db = async () => {
  try {
    await mongoose.connect(MongooseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection Error:", error.message);
  }
};

module.exports = db;
