import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PrescriptionSuccess.css';

const PrescriptionSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="success-page">
      <div className="success-content">
        <h1>Prescription submitted successfully</h1>
        <p>Your prescription has been sent and will be processed shortly.</p>
        <button onClick={handleBackToHome} className="back-to-home-btn">Back to Home</button>
      </div>
    </div>
  );
};

export default PrescriptionSuccess;