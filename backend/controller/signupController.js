const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model'); 
require('dotenv').config()
const JWT_SECRET = process.env.KEY; 


const signupController = async (req, res) => {
  const { email, password, FullName, Address, Contact } = req.body;

 
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      email,
      password: hashedPassword,
      FullName,
      Address,
      Contact
    });

    
    await newUser.save();

    
    const token = jwt.sign(
      { userId: newUser._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );


    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { email: newUser.email }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = signupController;
