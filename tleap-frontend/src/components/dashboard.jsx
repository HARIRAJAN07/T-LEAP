import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
      }}
    >
      <div style={{ marginBottom: '3%', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '380%',
            fontWeight: 'bold',
            color: 'black',
            textShadow: '0 6px 18px rgba(0,0,0,0.2)',
            letterSpacing: '2px',
          }}
        >
          Hello Champs 🎉
        </h1>
        <p
          style={{
            fontSize: '170%',
            color: 'black',
            marginTop: '1%',
            fontWeight: 500,
          }}
        >
          Choose Your Class 🚀
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2%',
          width: '85%',
          maxWidth: '3000px',
          marginBottom: '64px',
          height: '30%',
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
                  fontSize: '300%',
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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2%',
          width: '65%',
          maxWidth: '2200px',
          height: '30%',
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
                  fontSize: '300%',
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