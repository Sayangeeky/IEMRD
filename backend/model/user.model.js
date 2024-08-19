// model/user.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  FirstName:{
    type: String,
    // required: true,
  },

  Address:{
    type: String,
    // required: true,
  },
  Contact:{
    type: Number,
    // required: true
  },
  resetToken: {
    type: String,
    default: null
  },
  resetTokenExpiry: {
    type: Date,
    default: null
  },
  file: {
    filename: String,
    path: String
  }
}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
