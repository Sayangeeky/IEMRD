const bcrypt = require('bcryptjs');
const User = require('../model/user.model');

const updatepassController = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       
        const hashedPassword = await bcrypt.hash(password, 12); 

        user.password = hashedPassword;
        await user.save();

     
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = updatepassController;
