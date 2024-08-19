const adminController = (req, res) => {
    res.status(200).json({ message: 'Welcome, Admin!' });
};

module.exports = adminController;
