const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',  
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPosting', 
        required: true
    },
    interviewDate: {
        type: Date,
        required: true
    },
    interviewType: {
        type: String,
        enum: ['In-person', 'Virtual'],
        required: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Canceled'],
        default: 'Scheduled'
    },
    feedback: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
