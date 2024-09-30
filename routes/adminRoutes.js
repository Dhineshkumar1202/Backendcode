const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application');


router.post('/create-job', async (req, res) => {
  const { title } = req.body;

  try {
    const job = new Job({ title });
    await job.save();
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create job', error: err.message });
  }
});


router.put('/update-application/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application updated successfully', application });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update application', error: err.message });
  }
});


router.delete('/delete-application/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete application', error: err.message });
  }
});


router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications', error: err.message });
  }
});

module.exports = router;
