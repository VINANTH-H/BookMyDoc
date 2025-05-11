import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // optional

const Header = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/doctors">Doctors</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
};

export default Header;
