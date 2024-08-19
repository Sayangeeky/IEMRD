const nodemailer = require('nodemailer');
const User = require('../model/user.model');
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.MY_GMAIL, 
    pass: process.env.MY_PASSWORD,   
  },
});

const forgetPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

   
    user.resetToken = otp;
    user.resetTokenExpiry = Date.now() + 180000; 
    await user.save();

    const otpMessage = `
      <p>You requested an OTP for password reset. Use the following OTP to proceed:</p>
      <p><strong>${otp}</strong></p>
      <p>This OTP is valid for 3 minutes.</p>
    `;

    await transporter.sendMail({
      from: process.env.MY_GMAIL,
      to: email,
      subject: 'Your OTP Code',
      html: otpMessage,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Failed to send email:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = forgetPasswordController;
