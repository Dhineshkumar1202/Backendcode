const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  jobPosting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting', 
    required: true,
  },
  resume: {
    type: String, 
    required: true,
  },
  status: {
    type: String,
    enum: ['applied', 'interviewing', 'rejected', 'accepted'],
    default: 'applied',
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
