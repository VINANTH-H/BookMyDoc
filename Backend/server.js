const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Models
const Doctor = require('./models/doctor');
const Appointment = require('./models/appointment');
const User = require('./models/user');

// Root test route
app.get('/', (req, res) => {
  res.send('Doctor backend is running');
});

// ✅ User Signup
app.post('/api/auth/signup', async (req, res) => {
  const { firstName, lastName, phone, email, username, password, recoveryQuestion, recoveryAnswer } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      phone,
      email,
      username,
      password: hashedPassword,
      recoveryQuestion,
      recoveryAnswer,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

// ✅ User Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access denied' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// ✅ Validate Token
app.post('/api/auth/validate-token', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// ✅ Get doctors by specialization
app.get('/doctors', async (req, res) => {
  const { specialization } = req.query;
  try {
    const doctors = await Doctor.find(
      specialization ? { specialization } : {}
    );
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// ✅ Book appointment
app.post('/appointments', authenticateToken, async (req, res) => {
  const { doctorId, patientName, patientPhone, date, time } = req.body;

  try {
    const appointment = new Appointment({
      doctorId,
      patientName,
      patientPhone,
      date,
      time
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000; // Change the port to 5000
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});