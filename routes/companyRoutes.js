const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// Add a new company
router.post('/', async (req, res) => {
  const { name, email, contactNumber } = req.body;
  try {
    const newCompany = new Company({ name, email, contactNumber });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
