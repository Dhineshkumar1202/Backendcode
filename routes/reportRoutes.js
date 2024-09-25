// routes/reportRoutes.js
const express = require('express');
const Application = require('../models/Application');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Generate placement report (admin only)
router.get('/placements', authMiddleware.verifyAdmin, async (req, res) => {
  try {
    const placements = await Application.find({ status: 'accepted' })
      .populate('studentId', 'name email')
      .populate('jobId', 'title companyId')
      .populate({ path: 'jobId', populate: { path: 'companyId', select: 'name' } });
    res.json(placements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
