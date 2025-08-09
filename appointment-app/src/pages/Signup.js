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

  const [errors, setErrors] = useState({
    firstName: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    recoveryAnswer: '',
  });

  const [signupStatus, setSignupStatus] = useState({
    success: false,
    message: '',
    error: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = '';

    if (fieldName === 'firstName') {
      if (value.length < 4) {
        errorMessage = 'First name should be at least 4 characters.';
      }
    }

    if (fieldName === 'phone') {
      if (!/^\d{10}$/.test(value)) {
        errorMessage = 'Phone number must be 10 digits long.';
      }
    }

    if (fieldName === 'email') {
      if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = 'Please enter a valid email.';
      }
    }

    if (fieldName === 'password') {
      if (value.length < 4) {
        errorMessage = 'Password should be at least 4 characters.';
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if there are any validation errors before submitting
    if (Object.values(errors).some((error) => error !== '')) {
      alert('Please fix the errors before submitting.');
      return;
    }

    try {//Render replace
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`
, formData);
      setSignupStatus({
        success: true,
        message: response.data.message,
        error: false,
      });
      // Show success popup for 5 seconds
      setTimeout(() => {
        setSignupStatus({ success: false, message: '', error: false });
        window.location.href = '/login'; // Redirect after 2 seconds for user to see success message
      }, 5000);
    } catch (error) {
      setSignupStatus({
        success: false,
        message: error.response?.data?.message || 'Signup failed. Please try again.',
        error: true,
      });
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
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {/* No validation required for last name */}

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <div className="error">{errors.phone}</div>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <div className="error">{errors.username}</div>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="error">{errors.password}</div>}

          <select
            name="recoveryQuestion"
            value={formData.recoveryQuestion}
            onChange={handleChange}
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
            value={formData.recoveryAnswer}
            onChange={handleChange}
            required
          />
          {errors.recoveryAnswer && <div className="error">{errors.recoveryAnswer}</div>}

          <button type="submit" className="signup-button">Signup</button>
        </form>

        {/* Show success or failure popup based on the signup result */}
        {signupStatus.message && (
          <div className={`status-popup ${signupStatus.error ? 'error-popup' : 'success-popup'}`}>
            <span className={`status-icon ${signupStatus.error ? 'error-icon' : 'success-icon'}`}>
              {signupStatus.error ? '❌' : '✔️'}
            </span>
            <div className="status-message">{signupStatus.message}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
