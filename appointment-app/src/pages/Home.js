import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import doctorImage from '../assets/images.jpeg';

const Home = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleBookNow = () => {
    // Close chatbot if open
    if (window.chatbase && isChatOpen) {
      window.chatbase.close();
      setIsChatOpen(false);
    }
    navigate('/Doctors');
  };

  useEffect(() => {
    // Load Chatbase script
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.async = true;
    script.setAttribute('chatbotId', 'LBx77crH3h7r4qrvVyTPc'); // ✅ Updated chatbot ID
    script.setAttribute('chatbase-powered', 'true');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.chatbase) {
        clearInterval(interval);
        const chatIcon = document.querySelector('[chatbase-powered]');
        if (chatIcon) {
          chatIcon.addEventListener('click', () => {
            if (isChatOpen) {
              window.chatbase.close();
              setIsChatOpen(false);
            } else {
              window.chatbase.open();
              setIsChatOpen(true);
            }
          });
        }

        // Optional: Close chatbot on any other click
        document.addEventListener('click', (event) => {
          const target = event.target;
          const clickedChatIcon = chatIcon && chatIcon.contains(target);
          if (!clickedChatIcon && isChatOpen) {
            window.chatbase.close();
            setIsChatOpen(false);
          }
        });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isChatOpen]);

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



