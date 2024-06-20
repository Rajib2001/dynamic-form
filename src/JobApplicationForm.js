import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobApplicationForm.css';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        additionalSkills: checked
          ? [...formData.additionalSkills, value]
          : formData.additionalSkills.filter((skill) => skill !== value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is not valid';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    else if (isNaN(formData.phoneNumber)) newErrors.phoneNumber = 'Phone Number must be a valid number';
    if ((formData.position === 'Developer' || formData.position === 'Designer') && (!formData.relevantExperience || formData.relevantExperience <= 0)) {
      newErrors.relevantExperience = 'Relevant Experience is required and must be greater than 0';
    }
    if (formData.position === 'Designer' && !formData.portfolioURL) {
      newErrors.portfolioURL = 'Portfolio URL is required';
    } else if (formData.position === 'Designer' && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(formData.portfolioURL)) {
      newErrors.portfolioURL = 'Portfolio URL must be a valid URL';
    }
    if (formData.position === 'Manager' && !formData.managementExperience) {
      newErrors.managementExperience = 'Management Experience is required';
    }
    if (formData.additionalSkills.length === 0) newErrors.additionalSkills = 'At least one skill must be selected';
    if (!formData.preferredInterviewTime) newErrors.preferredInterviewTime = 'Preferred Interview Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/summary', { state: { formData } });
    }
  };

  return (
    <div className="form-container">
      <h1>Intermediate Dynamic Form</h1>
      {/* <h2>Job Application Form</h2> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>

        <div>
          <label>Applying for Position:</label>
          <select name="position" value={formData.position} onChange={handleChange}>
            <option value="">Select Position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <div>
            <label>Relevant Experience:</label>
            <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
            {errors.relevantExperience && <span className="error">{errors.relevantExperience}</span>}
          </div>
        )}

        {formData.position === 'Designer' && (
          <div>
            <label>Portfolio URL:</label>
            <input type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} />
            {errors.portfolioURL && <span className="error">{errors.portfolioURL}</span>}
          </div>
        )}

        {formData.position === 'Manager' && (
          <div>
            <label>Management Experience:</label>
            <textarea name="managementExperience" value={formData.managementExperience} onChange={handleChange}></textarea>
            {errors.managementExperience && <span className="error">{errors.managementExperience}</span>}
          </div>
        )}

        <div>
          <label>Additional Skills:</label>
          <div>
            <input type="checkbox" name="additionalSkills" value="JavaScript" checked={formData.additionalSkills.includes('JavaScript')} onChange={handleChange} /> JavaScript
          </div>
          <div>
            <input type="checkbox" name="additionalSkills" value="CSS" checked={formData.additionalSkills.includes('CSS')} onChange={handleChange} /> CSS
          </div>
          <div>
            <input type="checkbox" name="additionalSkills" value="Python" checked={formData.additionalSkills.includes('Python')} onChange={handleChange} /> Python
          </div>
          {errors.additionalSkills && <span className="error">{errors.additionalSkills}</span>}
        </div>

        <div>
          <label>Preferred Interview Time:</label>
          <input type="datetime-local" name="preferredInterviewTime" value={formData.preferredInterviewTime} onChange={handleChange} />
          {errors.preferredInterviewTime && <span className="error">{errors.preferredInterviewTime}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
