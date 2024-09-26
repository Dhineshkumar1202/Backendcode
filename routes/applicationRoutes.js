const express = require('express');
const router = express.Router();
const Application = require('../models/Application');


router.post('/apply', async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/job/:jobId', async (req, res) => {
  try {
    const applications = await Application.find({ jobPosting: req.params.jobId }).populate('student', 'name email');
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedApplication) return res.status(404).json({ message: 'Application not found' });
    res.status(200).json(updatedApplication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
