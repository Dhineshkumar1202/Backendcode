const express = require('express');
const PlacementDrive = require('../models/PlacementDrive'); // PlacementDrive model
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for admin verification

const router = express.Router();


router.post('/', authMiddleware.verifyAdmin, async (req, res) => {
  const { name, companies, students, driveDate, location, description } = req.body;
  try {
    const newPlacementDrive = new PlacementDrive({
      name,
      companies,
      students,
      driveDate,
      location,
      description,
    });
    await newPlacementDrive.save();
    res.status(201).json(newPlacementDrive);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
