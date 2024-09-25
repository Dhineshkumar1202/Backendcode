const mongoose = require('mongoose');

const placementDriveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Company IDs
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Student IDs
  driveDate: { type: Date, required: true },
  location: { type: String },
  description: { type: String },
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PlacementDrive', placementDriveSchema);
