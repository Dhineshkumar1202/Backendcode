// routes/recruitmentStatusRoutes.js
const express = require('express');
const Application = require('../models/Application');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware.verifyAdmin, async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const totalShortlisted = await Application.countDocuments({ status: 'shortlisted' });
    const totalRejected = await Application.countDocuments({ status: 'rejected' });
    res.json({ totalApplications, totalShortlisted, totalRejected });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
