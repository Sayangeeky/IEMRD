const User = require('../model/user.model');

const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    if (user.resetToken !== otp || user.resetTokenExpire < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }


    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = verifyOtpController;
