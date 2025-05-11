const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  username: { type: String, unique: true },
  password: String,
  recoveryQuestion: String,
  recoveryAnswer: String,
});

module.exports = mongoose.model('User', userSchema);