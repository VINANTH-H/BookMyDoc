import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    recoveryQuestion: '',
    recoveryAnswer: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert(response.data.message);
      // Redirect to login page after successful signup
      window.location.href = '/login';
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">SIGNUP</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <select
            name="recoveryQuestion"
            onChange={handleChange}
            value={formData.recoveryQuestion}
            required
          >
            <option value="">Select Recovery Question</option>
            <option value="color">What is your favorite color?</option>
            <option value="pet">What is your first pet’s name?</option>
            <option value="school">What is the name of your first school?</option>
          </select>

          <input
            type="text"
            name="recoveryAnswer"
            placeholder="Your Answer"
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-button">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;