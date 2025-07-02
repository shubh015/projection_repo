import React, { useState, useEffect } from 'react';

const SNAP_THRESHOLD = 2;

const EmotionSlider = ({
  label,
  color,
  sliderColor,
  gradientFrom,
  gradientTo,
  percentage,
  onChange,
  //   progressImage,
  threadImage,
  yarnImage,
}) => {
  const [showDot, setShowDot] = useState(percentage > 0);

  useEffect(() => {
    if (percentage <= 0) {
      setShowDot(false);
    } else {
      setShowDot(true);
    }
  }, [percentage]);

  const handleChange = (pct) => {
    const clamped = Math.min(100, Math.max(0, pct));
    if (clamped < SNAP_THRESHOLD) {
      setShowDot(false);
      onChange(0);
    } else {
      setShowDot(true);
      onChange(clamped);
    }
  };
  const leftOffset =
    percentage === 0
      ? '0px'
      : percentage === 100
        ? 'calc(100% - 32px)'
        : `calc(${percentage}% - 16px)`;

  return (
    <div
      className="relative bg-overlay rounded-[26px] p-[15px]"
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
            className="text-[80px] font-bold font-['Poppins'] leading-[45px] ml-[45px]"
            style={{ color }}
          >
            {label}
          </span>

          {/* Slider container */}
          <div
            className="relative flex-1 mx-[65px] p-12 cursor-pointer"
            style={{ overflow: 'visible', touchAction: 'none' }}
            onTouchMove={(e) => e.preventDefault()}
            // onClick={(e) => {
            //   const rect = e.currentTarget.getBoundingClientRect();
            //   const clickX = e.clientX - rect.left;
            //   const pct = (clickX / rect.width) * 100;
            //   onChange(Math.min(100, Math.max(0, pct)));
            // }}
            // onTouchStart={(e) => {
            //   e.preventDefault();
            //   const handleTouchMove = (moveEvent) => {
            //     const touch = moveEvent.touches[0];
            //     const rect = e.currentTarget.getBoundingClientRect();
            //     const pct = ((touch.clientX - rect.left) / rect.width) * 100;
            //     onChange(Math.min(100, Math.max(0, pct)));
            //   };
            //   const handleTouchEnd = () => {
            //     document.removeEventListener('touchmove', handleTouchMove);
            //     document.removeEventListener('touchend', handleTouchEnd);
            //   };
            //   document.addEventListener('touchmove', handleTouchMove, { passive: false });
            //   document.addEventListener('touchend', handleTouchEnd);
            // }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const pct = (clickX / rect.width) * 100;
              handleChange(pct);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              const handleTouchMove = (moveEvent) => {
                const touch = moveEvent.touches[0];
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = ((touch.clientX - rect.left) / rect.width) * 100;
                handleChange(pct);
              };
              const handleTouchEnd = () => {
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
              };
              document.addEventListener('touchmove', handleTouchMove, { passive: false });
              document.addEventListener('touchend', handleTouchEnd);
            }}
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

            {/* Yarn fixed at left */}
            {/* <img
              src={progressImage}
              alt="yarn"
              className="absolute top-1/2 left-0 z-20 pointer-events-none"
              style={{
                width: '60px',
                height: '60px',
                transform: 'translateY(-50%)',
              }}
            /> */}

            {/* Yarn Ball — always fixed at left */}
            {/* Yarn Ball — always fixed at left */}
           <img
  src={yarnImage}
  alt="yarn"
  className="absolute top-1/2 left-[-15px]"
  style={{
    width: '100px',
    height: '100px',
    transform: 'translateY(-50%)',
    zIndex: 30,
    cursor: 'grab',
  }}
  onMouseDown={(e) => {
    e.stopPropagation();
    const handleMouseMove = (moveEvent) => {
      const rect = e.target.parentElement.getBoundingClientRect();
      const pct = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      handleChange(pct); // This shows the dot too
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }}
  onTouchStart={(e) => {
    const target = e.target;
    const handleTouchMove = (moveEvent) => {
      const touch = moveEvent.touches[0];
      const rect = target.parentElement.getBoundingClientRect();
      const pct = ((touch.clientX - rect.left) / rect.width) * 100;
      handleChange(pct); // This shows the dot too
    };
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  }}
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
                src={threadImage} // just the thread, not yarn
                alt="thread"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'left center',
                }}
              />
            </div>

            {/* Stretching thread image */}
            {/* <div
              className="absolute top-1/2 left-[30px] transform -translate-y-1/2 h-[20px] z-10 pointer-events-none"
              style={{
                width: `calc(${percentage}% - 30px)`,
                overflow: 'hidden',
              }}
            >
              <img
                src={progressImage}
                alt="thread"
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'left center',
                }}
              />
            </div> */}

            {/* Dot */}
            {/* Slider dot */}
            {/* {showDot && (
              <div
                className="slider-dot absolute top-1/2 w-[60px] h-[60px] rounded-full border-2 border-white shadow-xl z-20"
                style={{
                  backgroundColor: sliderColor,
                  left: leftOffset,
                  transform: 'translateY(-50%)',
                  boxShadow: `0 0 15px 4px ${sliderColor}`,
                  cursor: 'grab',
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  const handleMouseMove = (moveEvent) => {
                    const rect = e.target.parentElement.getBoundingClientRect();
                    const pct = ((moveEvent.clientX - rect.left) / rect.width) * 100;
                    onChange(Math.min(100, Math.max(0, pct)));
                  };
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              />
            )} */}
            {showDot && (
  <div
    className="slider-dot absolute top-1/2 w-[60px] h-[60px] rounded-full border-2 border-white shadow-xl z-20"
    style={{
      backgroundColor: sliderColor,
      left: leftOffset,
      transform: 'translateY(-50%)',
      boxShadow: `0 0 15px 4px ${sliderColor}`,
      cursor: 'grab',
    }}
    onMouseDown={(e) => {
      e.stopPropagation();
      const handleMouseMove = (moveEvent) => {
        const rect = e.target.parentElement.getBoundingClientRect();
        const pct = ((moveEvent.clientX - rect.left) / rect.width) * 100;
        onChange(Math.min(100, Math.max(0, pct)));
      };
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }}
    onTouchStart={(e) => {
      const target = e.target;
      const handleTouchMove = (moveEvent) => {
        const touch = moveEvent.touches[0];
        const rect = target.parentElement.getBoundingClientRect();
        const pct = ((touch.clientX - rect.left) / rect.width) * 100;
        onChange(Math.min(100, Math.max(0, pct)));
      };
      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }}
  />
)}

          </div>

          {/* Percentage button */}
          <button
            className="bg-white text-dark text-6xl font-medium font-['Poppins'] px-[36px] py-[24px] rounded-[66px] border"
            style={{ borderColor: color }}
          >
            {Math.round(percentage)}%
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionSlider;
