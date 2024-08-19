require('dotenv').config();


const adminEmails = process.env.ADMIN_EMAIL.split(',').map(email => email.trim());

const adminMiddleware = (req, res, next) => {

  const { email } = req.body;

  
  if (!email) {
    return res.status(401).json({ message: 'Access denied: Email is required' });
  }


  if (!adminEmails.includes(email)) {
    return res.status(403).json({ message: 'Access forbidden: Admins only' });
  }

 
  next();
};

module.exports = adminMiddleware;
