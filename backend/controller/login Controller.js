const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model'); 
require('dotenv').config();

const JWT_SECRET = process.env.KEY; 

const loginController = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with success message and token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { email: user.email }
        });
    } catch (error) {
        // Log error and respond with server error
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = loginController;
