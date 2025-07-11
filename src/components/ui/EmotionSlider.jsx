import React, { useState, useEffect } from 'react';

const SNAP_THRESHOLD = 0;

const EmotionSlider = ({
  label,
  color,
  sliderColor,
  gradientFrom,
  gradientTo,
  percentage,
  onChange,
  threadImage,
  yarnImage,
}) => {
  const [showDot, setShowDot] = useState(percentage > 0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (percentage <= 0) {
      setShowDot(false);
    } else {
      setShowDot(true);
    }
  }, [percentage]);

  const handleChange = (pct) => {
    const clamped = Math.min(100, Math.max(0, pct));
    
    if (clamped === 0 && !isDragging) {
      setShowDot(false);
    } else {
      setShowDot(true);
    }

    onChange(clamped);
  };

  const leftOffset =
    percentage === 0
      ? '0px'
      : percentage === 100
        ? 'calc(100% - 32px)'
        : `calc(${percentage}% - 16px)`;

  // Unified touch/drag handler for the entire slider container
  const handleSliderInteraction = (e, isTouch = false) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Immediately show dot and set dragging state
    setShowDot(true);
    setIsDragging(true);
    
    // Get the slider container bounds
    const sliderContainer = e.currentTarget.closest('.emotion-slider-container') || e.currentTarget;
    const rect = sliderContainer.getBoundingClientRect();
    
    // Calculate initial position
    const getClientX = (event) => {
      if (isTouch) {
        return event.touches && event.touches.length > 0 ? event.touches[0].clientX : event.changedTouches[0].clientX;
      }
      return event.clientX;
    };
    
    const initialX = getClientX(e);
    const initialPct = ((initialX - rect.left) / rect.width) * 100;
    
    // Set initial value if starting from 0
    if (percentage === 0) {
      handleChange(Math.max(SNAP_THRESHOLD, initialPct));
    } else {
      handleChange(initialPct);
    }

    const handleMove = (moveEvent) => {
      moveEvent.preventDefault();
      
      const clientX = getClientX(moveEvent);
      const pct = ((clientX - rect.left) / rect.width) * 100;
      handleChange(pct);
    };

    const handleEnd = (endEvent) => {
      endEvent.preventDefault();
      setIsDragging(false);
      
      // Clean up event listeners
      if (isTouch) {
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      } else {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
      }
    };

    // Add event listeners
    if (isTouch) {
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd, { passive: false });
    } else {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
    }
  };

  // Specific handler for yarn ball to ensure immediate response
  const handleYarnInteraction = (e, isTouch = false) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Immediately show dot and activate
    setShowDot(true);
    setIsDragging(true);
    
    // If at 0%, set to a small value to make dot visible
    if (percentage === 0) {
      handleChange(Math.max(SNAP_THRESHOLD, 5)); // Start at 5% for better visibility
    }
    
    // Then handle as normal slider interaction
    handleSliderInteraction(e, isTouch);
  };

  return (
    <div
      className="relative bg-overlay rounded-[26px] p-[15px] no-select"
      style={{ border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div
        className="rounded-[15px] p-[3px]"
        style={{
          background: `linear-gradient(45deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        }}
      >
        <div
          className="rounded-[12px] p-12 flex items-center justify-between"
          style={{ backgroundColor: '#191919', overflow: 'visible' }}
        >
          {/* Label */}
          <span
            className="text-[80px] font-bold font-['Poppins'] leading-[45px] ml-[45px] no-select"
            style={{ color }}
          >
            {label}
          </span>

          {/* Slider container - Now handles all interactions */}
          <div
            className="emotion-slider-container relative flex-1 mx-[65px] p-12 cursor-pointer"
            style={{ 
              overflow: 'visible',
              touchAction: 'none', // Prevent all default touch behaviors
            }}
            onMouseDown={(e) => handleSliderInteraction(e, false)}
            onTouchStart={(e) => handleSliderInteraction(e, true)}
          >
            {/* Dim base bar */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 h-[20px] w-[99%] m-auto rounded-full"
              style={{
                backgroundColor: color,
                opacity: 0.3,
                zIndex: 0,
              }}
            />

            {/* Yarn Ball — always fixed at left with special handling */}
            <img
              src={yarnImage}
              alt="yarn"
              className="yarn-ball absolute top-1/2 left-[-15px]"
              style={{
                width: '100px',
                height: '100px',
                transform: 'translateY(-50%)',
                zIndex: 30,
                cursor: isDragging ? 'grabbing' : 'grab',
                touchAction: 'none',
              }}
              onMouseDown={(e) => handleYarnInteraction(e, false)}
              onTouchStart={(e) => handleYarnInteraction(e, true)}
              draggable={false}
            />

            {/* Thread Image — stretch based on percentage */}
            <div
              className="absolute top-1/2 left-[30px] transform -translate-y-1/2 h-[20px] z-20 pointer-events-none"
              style={{
                width: `calc(${percentage}% - 30px)`,
                overflow: 'hidden',
              }}
            >
              <img
                src={threadImage}
                alt="thread"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'left center',
                }}
                draggable={false}
              />
            </div>

            {/* Slider dot */}
            {showDot && (
              <div
                className="emotion-slider-dot absolute top-1/2 w-[60px] h-[60px] rounded-full border-2 border-white shadow-xl z-20"
                style={{
                  backgroundColor: sliderColor,
                  left: leftOffset,
                  transform: 'translateY(-50%)',
                  boxShadow: `0 0 15px 4px ${sliderColor}`,
                  cursor: isDragging ? 'grabbing' : 'grab',
                  touchAction: 'none',
                  pointerEvents: 'none', // Let parent handle all interactions
                }}
              />
            )}
          </div>

          {/* Percentage button */}
          <button
            className="percentage-button bg-white text-dark text-6xl font-medium font-['Poppins'] px-[36px] py-[24px] rounded-[66px] border no-select"
            style={{ 
              borderColor: color,
              touchAction: 'manipulation',
            }}
          >
            {Math.round(percentage)}%
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionSlider;