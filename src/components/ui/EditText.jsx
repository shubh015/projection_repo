import React from 'react';

const EditText = ({ 
  value, 
  onChange, 
  placeholder = '', 
  type = 'text',
  disabled = false,
  className = '',
  label = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-white text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-3 bg-overlay border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-success focus:border-transparent transition-all duration-200"
      />
    </div>
  );
};

export default EditText;