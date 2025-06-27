import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">The page you're looking for doesn't exist.</p>
      <a href="/" className="notfound-link">Return to Home</a>
    </div>
  );
};

export default NotFound;

