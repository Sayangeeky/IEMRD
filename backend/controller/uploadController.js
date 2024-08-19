const User = require('../model/user.model');

const uploadController = async (req, res) => {
  try {
    const { email } = req.body;
    const FILE = req.file;

    if (!email || !FILE) {
      return res.status(400).json({ msg: 'Email and file are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.file.filename = FILE.originalname
    user.file.path = FILE.path 

    await user.save();

    res.json({ FILE});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = uploadController;
