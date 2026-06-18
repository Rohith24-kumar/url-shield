const mongoose = require('mongoose');

// Shape of each individual security check result
const checkSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  passed: { type: Boolean, required: true },
  icon:   { type: String },
  detail: { type: String }
}, { _id: false });

// Shape of a full scan result stored in MongoDB
const scanResultSchema = new mongoose.Schema({
  url:       { type: String, required: true },
  riskScore: { type: Number, required: true },
  verdict:   { type: String, enum: ['Safe', 'Suspicious', 'Danger'], required: true },
  summary:   { type: String, required: true },
  checks:    { type: [checkSchema], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScanResult', scanResultSchema);
