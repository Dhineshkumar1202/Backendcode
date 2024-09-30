const express = require('express');
const router = express.Router();
const Application = require('../models/Application');


router.get('/applications', async (req, res) => {
  const studentId = req.user._id; 
  try {
    const applications = await Application.find({ student: studentId });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications', error: err.message });
  }
});


router.delete('/delete-application/:id', async (req, res) => {
  const { id } = req.params;
  const studentId = req.user._id;

  try {
    const application = await Application.findOneAndDelete({ _id: id, student: studentId });
    if (!application) {
      return res.status(404).json({ message: 'Application not found or unauthorized' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete application', error: err.message });
  }
});

module.exports = router;
