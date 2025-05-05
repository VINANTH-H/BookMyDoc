import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import doctorImage from '../assets/images.jpeg'; // Ensure the image is in src/assets/

const Home = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const isLoggedIn = localStorage.getItem('user'); // Check if user data exists in localStorage
    if (isLoggedIn) {
      navigate('/Doctors'); // Navigate to the Doctors page
    } else {
      navigate('/Login'); // Redirect to the Login page
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="text-section">
          <h1>Book Your Appointment Online</h1>
          <p>
            Say goodbye to long queues and waiting times. With our online appointment system, 
            you can consult trusted doctors from the comfort of your home.
          </p>
          <p>
            Browse available doctors, check their availability, and schedule your visit instantly. 
            Your health, your convenience — just one click away.
          </p>
          <button className="book-button" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
        <div className="image-section">
          <img src={doctorImage} alt="Doctor" />
        </div>
      </div>
    </div>
  );
};

export default Home;