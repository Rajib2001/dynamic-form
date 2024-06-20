import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobApplicationForm from './JobApplicationForm';
import FormSummary from './FormSummary';
import './App.css'; // Import App.css here

const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<JobApplicationForm />} />
          <Route path="/summary" element={<FormSummary />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
