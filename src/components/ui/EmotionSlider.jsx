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

  const handleSliderClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = (clickX / rect.width) * 100;
    handleChange(pct);
  };

const handleSliderTouch = (e) => {
  e.stopPropagation();
  setIsDragging(true);

  // 👇 ADD THIS TO FORCE DOT SHOWING WHEN AT 0%
  if (percentage <= 0) {
    const startPercentage = SNAP_THRESHOLD;
    setShowDot(true);
    onChange(startPercentage);
  }

  const handleTouchMove = (moveEvent) => {
    if (moveEvent.touches.length === 1) {
      const touch = moveEvent.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = ((touch.clientX - rect.left) / rect.width) * 100;
      handleChange(pct);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchend', handleTouchEnd, { passive: false });
};


const handleYarnDrag = (e, isTouch = false) => {
  e.stopPropagation();
  setIsDragging(true);
  
  // IMMEDIATE RESPONSE: Show dot immediately when yarn ball is touched
  setShowDot(true);
  
  // If starting from 0%, set to minimum threshold to make dot visible
  if (percentage === 0) {
    onChange(SNAP_THRESHOLD);
  }
  
  const rect = e.target.parentElement.getBoundingClientRect();

  const handleMove = (moveEvent) => {
    let clientX;
    if (isTouch) {
      if (moveEvent.touches.length === 1) {
        clientX = moveEvent.touches[0].clientX;
      } else {
        return; // Ignore multi-touch
      }
    } else {
      clientX = moveEvent.clientX;
    }

    const pct = ((clientX - rect.left) / rect.width) * 100;
    handleChange(pct);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (isTouch) {
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    } else {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
    }
  };

  if (isTouch) {
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd, { passive: false });
  } else {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
  }
};

  const handleDotDrag = (e, isTouch = false) => {
    e.stopPropagation();
    setIsDragging(true);

    const handleMove = (moveEvent) => {
      let clientX;
      if (isTouch) {
        if (moveEvent.touches.length === 1) {
          clientX = moveEvent.touches[0].clientX;
        } else {
          return; // Ignore multi-touch
        }
      } else {
        clientX = moveEvent.clientX;
      }

      const rect = e.target.parentElement.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      onChange(Math.min(100, Math.max(0, pct)));
    };

    const handleEnd = () => {
      setIsDragging(false);
      if (isTouch) {
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      } else {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
      }
    };

    if (isTouch) {
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd, { passive: false });
    } else {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
    }
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

          {/* Slider container */}
          <div
            className="emotion-slider-container relative flex-1 mx-[65px] p-12 cursor-pointer"
            style={{ 
              overflow: 'visible',
              touchAction: 'pan-x', // Allow horizontal panning only
            }}
            onClick={handleSliderClick}
            onTouchStart={handleSliderTouch}
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

            {/* Yarn Ball — always fixed at left */}
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
                touchAction: 'none', // Prevent default touch behaviors
              }}
              onMouseDown={(e) => handleYarnDrag(e, false)}
              onTouchStart={(e) => handleYarnDrag(e, true)}
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
                  touchAction: 'none', // Prevent default touch behaviors
                }}
                onMouseDown={(e) => handleDotDrag(e, false)}
                onTouchStart={(e) => handleDotDrag(e, true)}
              />
            )}
          </div>

          {/* Percentage button */}
          <button
            className="percentage-button bg-white text-dark text-6xl font-medium font-['Poppins'] px-[36px] py-[24px] rounded-[66px] border no-select"
            style={{ 
              borderColor: color,
              touchAction: 'manipulation', // Prevent zoom on button
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