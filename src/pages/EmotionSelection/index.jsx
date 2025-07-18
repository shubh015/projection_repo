import AppBackground from '@/components/common/AppBackground';
import CrawlingGradientButton from '@/components/ui/CrawlingGradientButton';
import EmotionSlider from '@/components/ui/EmotionSlider';
import { emotionData, getHexColorByIntensity } from '@/components/utils';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmotionSelection = () => {
  const navigate = useNavigate();
  const [emotions, setEmotions] = useState({
    red: 0,
    yellow: 0,
    green: 0,
    blue: 0,
  });

  const handleSliderChange = (emotion, value) => {
    setEmotions((prev) => ({
      ...prev,
      [emotion]: Math.round(value),
    }));
  };

  const handleWeaveClick = async () => {
    const payload = {};
    emotionData.forEach((emotion) => {
      const intensity = emotions[emotion.key];
      payload[emotion.key] = {
        value: intensity,
        color: getHexColorByIntensity(emotion.key, intensity),
      };
    });

    // console.log('Generated Payload:', payload);
       navigate('/exit-page');
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
           "Choose your emotional intensity"
          </p>
        </div>

        <div className="w-full px-14 space-y-[38px] mb-[56px]">
          {emotionData.map((emotion) => (
            <EmotionSlider
              key={emotion.key}
              label={emotion.label}
              color={emotion.color}
              gradientFrom={emotion.gradientFrom}
              gradientTo={emotion.gradientTo}
              // progressImage={emotion.progressImage}
              sliderColor={emotion.sliderColor}
              percentage={emotions[emotion.key]}
              threadImage={emotion.threadImage}
              yarnImage={emotion.yarnImage}
              onChange={(val) => handleSliderChange(emotion.key, val)}
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-white text-[45px] font-bold font-['Poppins'] leading-[60px] mb-[32px]">
            Press Weave to watch your future unfold
          </p>

          <CrawlingGradientButton onClick={handleWeaveClick} activateBorder={true}>
            <div className="text-white text-[120px] font-bold font-['Poppins'] leading-[135px] tracking-[2px] px-[126px] py-[26px]">
              WEAVE
            </div>
          </CrawlingGradientButton>
        </div>
      </div>
    </AppBackground>
  );
};

export default EmotionSelection;
