import React from 'react';

const SeekBar = ({ 
  value = 0, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  label = '',
  color = 'success',
  className = ''
}) => {
  const colors = {
    success: 'accent-success',
    blue: 'accent-blue',
    danger: 'accent-danger',
    warning: 'accent-warning'
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className="text-white text-sm font-medium">{label}</label>
          <span className="text-white text-sm">{value}%</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className={`w-full h-2 bg-overlay rounded-lg appearance-none cursor-pointer ${colors[color]} slider`}
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--bg-${color});
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--bg-${color});
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default SeekBar;