import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({ statusCode, message }) => {
  return (
    <div className="error">
      <div className="error-page">
        <div className="error-content">
          <h1 className="error-code">{statusCode || 'Oops!'}</h1>
          <p className="error-message">{message || 'Something went wrong. Please try again later.'}</p>
          <Link to="/" className="error-link">Go back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
