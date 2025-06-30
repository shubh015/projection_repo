import AppBackground from '@/components/common/AppBackground';
import CrawlingGradientButton from '@/components/ui/CrawlingGradientButton';
import { emotionData, getHexColorByIntensity } from '@/components/utils';
import { Thread } from '@/icons/thread';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmotionSelection = () => {
  const navigate = useNavigate();
  const [emotions, setEmotions] = useState({
    anger: 0,
    greed: 0,
    maya: 0,
    maan: 0,
  });

  const handleSliderChange = (emotion, value) => {
    setEmotions((prev) => ({
      ...prev,
      [emotion]: Math.round(value),
    }));
  };

  const handleWeaveClick = async() => {
    const payload = {};
    emotionData.forEach((emotion) => {
      const intensity = emotions[emotion.key];
      payload[emotion.key] = {
        value: intensity,
        color: getHexColorByIntensity(emotion.key, intensity),
      };
    });

    console.log('Generated Payload:', payload);
    try {
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
  
      const data = await response.json();
      console.log('Server Response:', data);
  
      navigate('/exit-page');
    } catch (error) {
      console.error('Error sending data:', error.message);
      alert('Failed to weave emotions. Please try again.');
    }
  };


  return (
    <AppBackground>
      <style jsx>{`
        @keyframes crawlGradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .rotating-gradient {
          position: relative;
          border-radius: 26px;
          padding: 4px;
          background: linear-gradient(
            90deg,
            #de9000 0%,
            #048b43 25%,
            #3849be 50%,
            #de0026 75%,
            #de9000 100%,
            #048b43 125%,
            #3849be 150%,
            #de0026 175%,
            #de9000 200%
          );
          background-size: 200% 100%;
          animation: crawlGradient 3s linear infinite;
        }

        .weave-button-inner {
          position: relative;
          z-index: 1;
          background: #191919;
          border-radius: 22px;
        }

        /* Touch-friendly styles for kiosk mode */
        .touch-slider {
          touch-action: pan-x;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .slider-dot {
          transition: all 0.1s ease-out;
          cursor: grab;
        }

        .slider-dot:active {
          cursor: grabbing;
          transform: translateY(-50%) scale(1.1);
        }

        .weave-button {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .weave-button:hover {
          transform: scale(1.05);
        }

        .weave-button:active {
          transform: scale(0.98);
        }
      `}</style>

      <div className="relative z-10 flex flex-col min-h-screen w-1/2 m-auto justify-center items-center">
        <div className="text-center mb-[74px] flex flex-col gap-3">
          <h1 className="text-white text-[145px] font-semibold font-['Poppins'] leading-[160px] mb-[12px]">
            Emotion Selection
          </h1>
          <p className="text-white text-[45px] font-medium font-['Poppins'] leading-[55px]">
            Select the emotions in your nature and their percentage
          </p>
        </div>

        <div className="w-full px-14 space-y-[38px] mb-[56px]">
          {emotionData.map((emotion) => {
            const percentage = emotions[emotion.key];
            let leftOffset;
            if (percentage === 0) {
              leftOffset = '0px';
            } else if (percentage === 100) {
              leftOffset = 'calc(100% - 32px)';
            } else {
              leftOffset = `calc(${percentage}% - 16px)`;
            }

            return (
              <div
                key={emotion.key}
                className="relative bg-overlay rounded-[26px] p-[15px]"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div
                  className="rounded-[15px] p-[3px]"
                  style={{
                    background: `linear-gradient(45deg, ${emotion.gradientFrom} 0%, ${emotion.gradientTo} 100%)`,
                  }}
                >
                  <div
                    className="rounded-[12px] p-12 flex items-center justify-between"
                    style={{ backgroundColor: '#191919' }}
                  >
                    <span
                      className="text-[80px] font-bold font-['Poppins'] leading-[45px] ml-[45px]"
                      style={{ color: emotion.color }}
                    >
                      {emotion.label}
                    </span>

                    <div
                      className="relative flex-1 mx-[65px] p-12 cursor-pointer touch-slider"
                      onTouchStart={(e) => {
                        e.preventDefault();
                        const handleTouchMove = (moveEvent) => {
                          const touch = moveEvent.touches[0];
                          const rect = e.currentTarget.getBoundingClientRect();
                          const percentage = Math.min(
                            100,
                            Math.max(0, ((touch.clientX - rect.left) / rect.width) * 100)
                          );
                          handleSliderChange(emotion.key, percentage);
                        };

                        const handleTouchEnd = () => {
                          document.removeEventListener('touchmove', handleTouchMove);
                          document.removeEventListener('touchend', handleTouchEnd);
                        };

                        document.addEventListener('touchmove', handleTouchMove, { passive: false });
                        document.addEventListener('touchend', handleTouchEnd);
                      }}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const percentage = (clickX / rect.width) * 100;
                        handleSliderChange(emotion.key, Math.min(100, Math.max(0, percentage)));
                      }}
                    >
                      {/* Base full bar */}
                      <div
                        className="absolute top-1/2 transform -translate-y-1/2 h-[20px] w-full rounded-full"
                        style={{
                          backgroundColor: emotion.color,
                          opacity: 0.3,
                        }}
                      />

                      {/* Progress thread image - Perfectly aligned */}
                      <div
                        className="absolute top-1/2 transform -translate-y-1/2 h-[20px] overflow-hidden rounded-full transition-all duration-150 ease-out"
                        style={{
                          width: `${percentage}%`,
                          left: '0%',
                        }}
                      >
                        <div
                          className="h-full bg-cover bg-left-center rounded-full"
                          style={{
                            backgroundImage: `url(${emotion.progressImage})`,
                            width: percentage === 0 ? '0%' : '100%',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'left center',
                          }}
                        />
                      </div>

                      {/* Slider dot */}
                      <div
                        className="slider-dot absolute top-1/2 w-[60px] h-[60px] rounded-full border-2 border-white shadow-xl z-20"
                        style={{
                          backgroundColor: emotion.sliderColor,
                          left: leftOffset,
                          boxShadow: `0 0 15px 4px ${emotion.sliderColor}`,
                          transform: 'translateY(-50%)',
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          const handleMouseMove = (moveEvent) => {
                            const rect = e.target.parentElement.getBoundingClientRect();
                            const percentage = Math.min(
                              100,
                              Math.max(0, ((moveEvent.clientX - rect.left) / rect.width) * 100)
                            );
                            handleSliderChange(emotion.key, percentage);
                          };

                          const handleMouseUp = () => {
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                          };

                          document.addEventListener('mousemove', handleMouseMove);
                          document.addEventListener('mouseup', handleMouseUp);
                        }}
                      />
                    </div>

                    <button
                      className="bg-white text-dark text-6xl font-medium font-['Poppins'] px-[36px] py-[24px] rounded-[66px] border"
                      style={{ borderColor: emotion.color }}
                    >
                      {emotions[emotion.key]}%
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-white text-[45px] font-bold font-['Poppins'] leading-[60px] mb-[32px]">
            Press Weave to watch your future unfold
          </p>

          <CrawlingGradientButton onClick={handleWeaveClick}>
            <div className="text-white text-[120px] font-bold font-['Poppins'] leading-[135px] tracking-[2px] px-[126px] py-[26px]">
              WEAVE
            </div>
          </CrawlingGradientButton>
        </div>

                                <Thread height='200px' width='500px'/>

      </div>
    </AppBackground>
  );
};

export default EmotionSelection;
