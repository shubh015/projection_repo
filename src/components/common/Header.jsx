import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title = '', showBack = false }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="w-full bg-primary border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {showBack && (
          <button
            onClick={handleBack}
            className="text-white hover:text-success transition-colors duration-200"
          >
            ← Back
          </button>
        )}
        {title && (
          <h1 className="text-white text-xl font-semibold">{title}</h1>
        )}
        <div className="w-16"></div>
      </div>
    </header>
  );
};

export default Header;