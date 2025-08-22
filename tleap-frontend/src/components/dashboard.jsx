import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Boy from '../images/human vector.png';

const baseCardStyle = {
  background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
  borderRadius: '22px',
  width: '100%',
  height: '100%',
  boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  overflow: 'hidden',
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("en");
  const [displayText, setDisplayText] = useState('');
  
  const texts = {
    en: {
      welcome: "Hii Champs",
      chooseClass: "Choose Your Class 🚀",
    },
    ta: {
      welcome: "வவணக்கம் தோழா",
      chooseClass: "உங்கள் வகுப்பைத் தேர்ந்தெடுக்கவும் 🚀",
    }
  };

  useEffect(() => {
    let index = 0;
    setDisplayText(""); // reset when language changes
    const interval = setInterval(() => {
      if (index < texts[language].welcome.length) {
        setDisplayText((prev) => prev + texts[language].welcome.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [language]);

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-10px) scale(1.04)';
    e.currentTarget.style.boxShadow =
      '0 18px 40px rgba(0,0,0,0.25), 0 24px 60px rgba(0,0,0,0.18)';
    e.currentTarget.style.background =
      'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
    e.currentTarget.style.background =
      'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)';
  };

  const handleSelectClass = (cls) => {
    navigate(`/subjects/${cls}`);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(135deg, #c3ecf7 0%, #f5f7fa 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Language Toggle Button */}
      <button
        onClick={() => setLanguage(language === "en" ? "ta" : "en")}
        style={{
          position: 'absolute',
          top: '20px',
          right: '30px',
          padding: '8px 14px',
          borderRadius: '10px',
          border: 'none',
          background: 'black',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          fontSize: '14px'
        }}
      >
        {language === "en" ? "தமிழ்" : "English"}
      </button>

      {/* Top Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          marginBottom: '3vh',
          height: '20vh',
          gap: '3vw',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <h1
            style={{
              fontSize: '6vh',
              fontWeight: 'bold',
              color: 'black',
              textShadow: '0 6px 18px rgba(0,0,0,0.2)',
              letterSpacing: '2px',
              minHeight: '6vh',
              transition: 'all 0.3s ease',
            }}
          >
            {displayText}
            <span
              style={{
                display: 'inline-block',
                marginLeft: '0.5vw',
                animation: 'blink 1s step-start infinite',
              }}
            >
              |
            </span>
            <style>
              {`
                @keyframes blink {
                  50% { opacity: 0; }
                }
              `}
            </style>
          </h1>
          <p
            style={{
              fontSize: '5vh',
              color: 'black',
              marginTop: '1%',
              fontWeight: 500,
            }}
          >
            {texts[language].chooseClass}
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <img
            src={Boy}
            alt="Welcome"
            style={{ maxWidth: '50vh', width: '10vh', height: 'auto' }}
          />
        </div>
      </div>

      {/* First Row of Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2%',
          width: '85%',
          maxWidth: '3000px',
          marginBottom: '4vh',
          height: '25vh',
        }}
      >
        {['6', '7', '8', '9'].map((num) => (
          <Card
            key={num}
            style={baseCardStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleSelectClass(num)}
          >
            <CardContent>
              <Typography
                style={{
                  fontSize: '7vh',
                  fontWeight: 'bold',
                  color: 'black',
                  textShadow: '0 3px 8px rgba(0,0,0,0.15)',
                }}
              >
                {num}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Second Row of Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2%',
          width: '65%',
          maxWidth: '2200px',
          height: '25vh',
        }}
      >
        {['10', '11', '12'].map((num) => (
          <Card
            key={num}
            style={baseCardStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleSelectClass(num)}
          >
            <CardContent>
              <Typography
                style={{
                  fontSize: '7vh',
                  fontWeight: 'bold',
                  color: 'black',
                  textShadow: '0 3px 8px rgba(0,0,0,0.15)',
                }}
              >
                {num}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;