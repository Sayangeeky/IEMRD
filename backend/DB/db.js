const mongoose = require('mongoose');


const MONGO_URI = 'mongodb://localhost:27017/TEST'; 
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    
  }
};

module.exports = connectDB;
