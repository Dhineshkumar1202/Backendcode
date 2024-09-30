const express = require('express');
const PlacementDrive = require('../models/PlacementDrive');
const authMiddleware = require('../middleware/authMiddleware'); 

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


router.get('/', async (req, res) => {
    try {
        const placementDrives = await PlacementDrive.find();
        res.status(200).json(placementDrives);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
