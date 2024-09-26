const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['admin', 'user']).withMessage('Invalid role'),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract data
    const { name, email, password, role } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
      });

      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, // Include isAdmin to verify role
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    
    res.json({ token, user: { id: user._id, email: user.email, isAdmin: user.isAdmin } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


