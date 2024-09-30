const express = require('express');
const router = express.Router();
const Job = require('../models/Job');


// Create a Job Listing
router.post('/create-job', async (req, res) => {
  const { title } = req.body;
  const companyId = req.user._id; // Assuming the company is authenticated

  try {
    const job = new Job({ title, company: companyId });
    await job.save();
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create job', error: err.message });
  }
});


router.get('/jobs', async (req, res) => {
  const companyId = req.user._id;

  try {
    const jobs = await Job.find({ company: companyId });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
});


router.delete('/delete-job/:id', async (req, res) => {
  const { id } = req.params;
  const companyId = req.user._id;

  try {
    const job = await Job.findOneAndDelete({ _id: id, company: companyId });
    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete job', error: err.message });
  }
});

module.exports = router;
