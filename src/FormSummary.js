import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './JobApplicationForm.css';

const FormSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  if (!formData) {
    return <p>No form data available.</p>;
  }

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="summary">
      <h1>Intermediate Dynamic Form</h1>
      <h2>Application Summary</h2>
      <p><strong>Full Name:</strong> {formData.fullName}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
      <p><strong>Applying for Position:</strong> {formData.position}</p>
      {formData.relevantExperience && <p><strong>Relevant Experience:</strong> {formData.relevantExperience}</p>}
      {formData.portfolioURL && <p><strong>Portfolio URL:</strong> {formData.portfolioURL}</p>}
      {formData.managementExperience && <p><strong>Management Experience:</strong> {formData.managementExperience}</p>}
      <p><strong>Additional Skills:</strong> {formData.additionalSkills.join(', ')}</p>
      <p><strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}</p>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default FormSummary;
