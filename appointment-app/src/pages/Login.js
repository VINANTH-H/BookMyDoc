import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {//Render replace
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`
, {
        username,
        password,
      });

      localStorage.setItem('userToken', response.data.token); // Save the token
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage('✅ Login successful!');
      setMessageType('success');

      setTimeout(() => {
        setMessage('');
        const redirectData = localStorage.getItem('redirectAfterLogin');
        if (redirectData) {
          navigate('/doctors');
        } else {
          navigate('/doctors');
        }
      }, 1500);
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Login failed. Check username and Password.'));
      setMessageType('error');

      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 1500);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="page-heading">📅 Your Health, One Click Away – Book Your Appointment Today!👨‍⚕️</h1>

        {message && (
          <div className={`popup-message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="login-box">
          <form onSubmit={handleLogin}>
            <p className="welcome-subtitle">🔒 Please login to book your appointment</p>
            <h2 className="login-title">LOGIN</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="signup-link">New user? <Link to="/signup">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;