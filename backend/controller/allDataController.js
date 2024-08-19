const User = require('../model/user.model'); 

const allDataController = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: 'Users retrieved successfully',
            users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = allDataController;
