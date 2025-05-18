const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  patientName: String,
  patientPhone: String,
  date: String,
  time: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
