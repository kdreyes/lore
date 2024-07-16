const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log('Decoded user:', req.user);

    // Fetch the user to ensure it exists in the database
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found in the database');
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }

    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
