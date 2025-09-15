const express = require('express');
const mongoose = require('mongoose');

const app = express();
//812mWTeopLsUQ04e
const MongooseUrl ="mongodb+srv://bit21cs51:812mWTeopLsUQ04e@cartify.kt7cddb.mongodb.net/?retryWrites=true&w=majority&appName=CartiFy";

const db = async () => {
  try {
    await mongoose.connect("mongodb+srv://bit21cs51:mDmCB1g5tEafImqo@cartify.kt7cddb.mongodb.net/?retryWrites=true&w=majority&appName=CartiFy", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection Error:", error.message);
  }
};

module.exports = db;
