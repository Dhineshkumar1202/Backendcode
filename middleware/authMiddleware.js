// authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware to verify if the user is an admin
exports.verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Use the secret from your .env
    if (!verified.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next(); // Allow the admin to proceed
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

