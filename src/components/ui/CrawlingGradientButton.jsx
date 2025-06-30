import React from 'react';

const CrawlingGradientButton = ({ 
  children, 
  onClick, 
  className = '', 
  style = {}, 
  disabled = false,
  animationDuration = '3s',
  gradientColors = ['#DE9000', '#048B43', '#3849BE', '#DE0026'],
  borderRadius = '26px',
  padding = '12px'
}) => {
  // Create gradient string with repeated colors for smooth crawling effect
  const createCrawlingGradient = (colors) => {
    const extendedColors = [...colors, ...colors]; // Double the colors for smooth loop
    return extendedColors.map((color, index) => 
      `${color} ${(index * 100) / (extendedColors.length - 1)}%`
    ).join(', ');
  };

  const gradientString = createCrawlingGradient(gradientColors);

  return (
    <>
      <style jsx>{`
        @keyframes crawlGradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        .crawling-gradient-btn {
          position: relative;
          border: none;
          outline: none;
          background: linear-gradient(90deg, ${gradientString});
          background-size: 200% 100%;
          animation: ${disabled ? 'none' : `crawlGradient ${animationDuration} linear infinite`};
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          opacity: ${disabled ? '0.6' : '1'};
        }
        
        .crawling-gradient-btn:hover:not(:disabled) {
          transform: scale(1.05);
        }
        
        .crawling-gradient-btn:active:not(:disabled) {
          transform: scale(0.98);
        }
        
        .crawling-gradient-btn-inner {
          position: relative;
          z-index: 1;
          background: #191919;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      
      <button
        className={`crawling-gradient-btn ${className}`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        style={{
          borderRadius,
          padding,
          ...style
        }}
      >
        <div 
          className="crawling-gradient-btn-inner"
          style={{
            borderRadius: `calc(${borderRadius} - ${padding})`,
          }}
        >
          {children}
        </div>
      </button>
    </>
  );
};

export default CrawlingGradientButton;