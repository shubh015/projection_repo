// pages/NameEntry.jsx
import AppBackground from '@/components/common/AppBackground';
import CrawlingGradientButton from '@/components/ui/CrawlingGradientButton';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NameEntry = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Touch and keyboard optimization
  useEffect(() => {
    // Add touch-specific styles to body
    document.body.style.touchAction = 'manipulation';
    document.body.style.webkitTouchCallout = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.webkitTapHighlightColor = 'transparent';

    return () => {
      // Cleanup on unmount
      document.body.style.touchAction = '';
      document.body.style.webkitTouchCallout = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.webkitTapHighlightColor = '';
    };
  }, []);

  const handleContinue = () => {
    if (name.trim()) {
      sessionStorage.setItem('userName', name.trim());
      navigate('/emotion-selection', { state: { userName: name.trim() } });
    } else {
      alert('Please enter your name to continue');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Enhanced touch handlers for virtual keyboard
  const handleInputTouch = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (inputRef.current) {
      // Force focus with multiple attempts
      inputRef.current.focus();

      // Additional trigger attempts for stubborn virtual keyboards
      setTimeout(() => {
        inputRef.current.click();
        inputRef.current.focus();
      }, 50);

      setTimeout(() => {
        inputRef.current.focus();
      }, 150);
    }
  };

  const handleInputFocus = () => {
    if (inputRef.current) {
      // Ensure cursor is visible and keyboard appears
      inputRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const handleContainerTouch = (e) => {
    // If user touches the input container, focus the input
    if (e.target !== inputRef.current) {
      handleInputTouch(e);
    }
  };

  return (
    <AppBackground>
      <div className="flex flex-col items-center justify-center h-full px-4 my-20">
        <div className="flex flex-col items-center space-y-8 w-full gap-20">
          {/* Title */}
          <h1 className="text-white text-[110px] font-bold leading-[113px] text-center font-poppins">
            Enter Your Name
          </h1>

          {/* Input Field - Enhanced for Touch */}
          <div className="w-full px-4">
            <div className="relative rounded-[30px] p-[2px]">
              <div
                className="rounded-[28px] bg-[#191919] border border-white/20 backdrop-blur-md px-6 py-24 shadow-lg w-1/2 mx-auto cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(102,102,102,0.2), rgba(255,255,255,0.1))',
                  touchAction: 'manipulation',
                }}
                onTouchStart={handleContainerTouch}
                onTouchEnd={(e) => e.preventDefault()}
                onClick={handleInputTouch}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  onFocus={handleInputFocus}
                  onTouchStart={handleInputTouch}
                  onTouchEnd={(e) => e.preventDefault()}
                  placeholder="Your Name"
                  className="w-full bg-transparent text-white text-7xl font-normal leading-[48px] text-center font-poppins placeholder-white outline-none border-none caret-white"
                  style={{
                    touchAction: 'manipulation',
                    WebkitUserSelect: 'text',
                    MozUserSelect: 'text',
                    msUserSelect: 'text',
                    userSelect: 'text',
                    WebkitTouchCallout: 'default',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  // HTML attributes for better virtual keyboard behavior
                  autoComplete="name"
                  autoCorrect="off"
                  autoCapitalize="words"
                  spellCheck="false"
                  inputMode="text"
                  enterKeyHint="done"
                />
              </div>
            </div>
          </div>

          {/* Continue Button - Enhanced for Touch */}
          <div
            className="transition-transform duration-150 hover:scale-105 active:scale-95"
            style={{ touchAction: 'manipulation' }}
          >
            <CrawlingGradientButton onClick={handleContinue}>
              <div className="text-white text-[120px] font-bold font-['Poppins'] leading-[135px] tracking-[2px] px-[126px] py-[26px]">
                Continue
              </div>
            </CrawlingGradientButton>
          </div>
        </div>
      </div>
    </AppBackground>
  );
};

export default NameEntry;
