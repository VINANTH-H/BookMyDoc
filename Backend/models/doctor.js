const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  hospital: String,
  availableTime: String
});

module.exports = mongoose.model('Doctor', doctorSchema);
