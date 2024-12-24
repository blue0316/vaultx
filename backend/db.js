/* eslint-disable no-undef */
const mongoose = require('mongoose');
require('dotenv').config();

module.exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};
