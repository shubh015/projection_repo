import AppBackground from '@/components/common/AppBackground';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmotionSelection = () => {
  const navigate = useNavigate();
  const [emotions, setEmotions] = useState({
    anger: 50,
    greed: 50,
    maya: 50,
    maan: 50,
  });

  const handleSliderChange = (emotion, value) => {
    setEmotions((prev) => ({
      ...prev,
      [emotion]: value,
    }));
  };

  const snapToStep = (percentage) => {
    if (percentage < 12.5) return 0;
    if (percentage < 37.5) return 25;
    if (percentage < 62.5) return 50;
    if (percentage < 87.5) return 75;
    return 100;
  };

const handleWeaveClick = async () => {
  const payload = {};
  emotionData.forEach((emotion) => {
    payload[emotion.key] = {
      value: emotions[emotion.key],
      color: emotion.color,
    };
  });

  console.log('Generated Payload:', payload);

  try {
    const response = await fetch('http://localhost:3000/api/weave', {
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

    // On success, navigate
    navigate('/exit-page');
  } catch (error) {
    console.error('Error sending data:', error.message);
    alert('Failed to weave emotions. Please try again.');
  }
};


  const emotionData = [
    {
      key: 'anger',
      label: 'Anger',
      color: '#de0026',
      gradientFrom: '#d69191fc',
      gradientTo: '#ff0000',
      progressImage: '/images/img_test_1.png',
      sliderColor: '#fb0a0a',
    },
    {
      key: 'greed',
      label: 'Greed',
      color: '#de9000',
      gradientFrom: '#de9000',
      gradientTo: '#de9000',
      progressImage: '/images/img_yelloe_progress_bar_1.png',
      sliderColor: '#fcaa01',
    },
    {
      key: 'maya',
      label: 'Maya',
      color: '#048b43',
      gradientFrom: '#8ed5af',
      gradientTo: '#048b43',
      progressImage: '/images/img_green_progress_bar_1.png',
      sliderColor: '#00ad56',
    },
    {
      key: 'maan',
      label: 'Maan',
      color: '#3849be',
      gradientFrom: '#8f99df',
      gradientTo: '#3849be',
      progressImage: '/images/img_blue_progress_bar_1.png',
      sliderColor: '#0e2ca8',
    },
  ];

  return (
    <AppBackground>
      <div className="relative z-10 flex flex-col min-h-screen w-1/2 m-auto justify-center items-center">
        <div className="text-center mb-[74px]">
          <h1 className="text-white text-[110px] font-semibold font-['Poppins'] leading-[113px] mb-[12px]">
            Emotion Selection
          </h1>
          <p className="text-white text-[36px] font-medium font-['Poppins'] leading-[31px]">
            Select the emotions in your nature and their percentage
          </p>
        </div>

        <div className="w-full px-14 space-y-[38px] mb-[56px]">
          {emotionData.map((emotion) => {
            let leftOffset;
            if (emotions[emotion.key] === 0) {
              leftOffset = '0px';
            } else if (emotions[emotion.key] === 100) {
              leftOffset = 'calc(100% - 32px)';
            } else {
              leftOffset = `calc(${emotions[emotion.key]}% - 16px)`;
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
                      className="text-[60px] font-bold font-['Poppins'] leading-[45px] ml-[45px]"
                      style={{ color: emotion.color }}
                    >
                      {emotion.label}
                    </span>

                    <div
                      className="relative flex-1 mx-[65px] p-12 cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const percentage = (clickX / rect.width) * 100;
                        const snapped = snapToStep(percentage);
                        handleSliderChange(emotion.key, snapped);
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

                      {/* Progress thread image */}
                      <div
                        className="absolute top-0 left-0 h-full overflow-hidden rounded-full transition-all duration-300 ease-in-out"
                        style={{
                          width:
                            emotions[emotion.key] === 0
                              ? '100px'
                              : emotions[emotion.key] === 100
                              ? '100%'
                              : `${Math.max(emotions[emotion.key], 10)}%`,
                          minWidth: '100px',
                        }}
                      >
                        <img
                          src={emotion.progressImage}
                          alt={`${emotion.label} progress`}
                          className="h-full object-left object-cover"
                          style={{
                            width: '100%',
                          }}
                        />
                      </div>

                      {/* Slider dot */}
                      <div
                        className="absolute top-1/2 transform -translate-y-1/2 w-[32px] h-[32px] rounded-full border-2 border-white cursor-pointer shadow-xl z-20 transition-all duration-200 ease-in-out"
                        style={{
                          backgroundColor: emotion.sliderColor,
                          left: leftOffset,
                          boxShadow: `0 0 15px 4px ${emotion.sliderColor}`,
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation(); // Prevent click-to-jump from firing
                          const handleMouseMove = (moveEvent) => {
                            const rect = e.target.parentElement.getBoundingClientRect();
                            const percentage = Math.min(
                              100,
                              Math.max(
                                0,
                                ((moveEvent.clientX - rect.left) / rect.width) * 100
                              )
                            );
                            handleSliderChange(emotion.key, snapToStep(percentage));
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
          <p className="text-white text-[36px] font-bold font-['Poppins'] leading-[36px] mb-[32px]">
            Press Weave to watch your future unfold
          </p>

          <button
            onClick={handleWeaveClick}
            className="relative rounded-[26px] p-[10px] hover:scale-105 transition-all duration-200"
            style={{
              background:
                'linear-gradient(45deg, #DE9000 0%, #048B43 25%, #3849BE 50%, #DE0026 75%, #DE9000 100%)',
            }}
          >
            <div className="text-white text-[85px] font-bold font-['Poppins'] leading-[78px] tracking-[2px] rounded-[26px] px-[126px] py-[26px] flex items-center justify-center w-full h-full bg-[#191919]">
              WEAVE
            </div>
          </button>
        </div>
      </div>
    </AppBackground>
  );
};

export default EmotionSelection;
