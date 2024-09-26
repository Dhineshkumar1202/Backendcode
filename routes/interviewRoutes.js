const express = require('express');
const Interview = require('../models/Interview');  // Import the Interview model
const router = express.Router();


router.post('/schedule', async (req, res) => {
    try {
        const { studentId, companyId, jobId, interviewDate, interviewType } = req.body;
        const interview = new Interview({
            studentId,
            companyId,
            jobId,
            interviewDate,
            interviewType
        });
        await interview.save();
        res.status(201).json({ message: 'Interview scheduled successfully', interview });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/student/:id', async (req, res) => {
    try {
        const interviews = await Interview.find({ studentId: req.params.id })
            .populate('companyId jobId')
            .exec();
        res.status(200).json(interviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { status, feedback } = req.body;
        const interview = await Interview.findByIdAndUpdate(
            req.params.id,
            { status, feedback },
            { new: true }
        );
        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }
        res.status(200).json({ message: 'Interview updated successfully', interview });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
