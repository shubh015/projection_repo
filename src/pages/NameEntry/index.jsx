// pages/NameEntry.jsx
import AppBackground from '@/components/common/AppBackground';
import CrawlingGradientButton from '@/components/ui/CrawlingGradientButton';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NameEntry = () => {
  const [name, setName] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Detect virtual keyboard state
  useEffect(() => {
    const initialHeight = window.innerHeight;
    
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = initialHeight - currentHeight;
      
      // If height decreased by more than 150px, keyboard is likely open
      if (heightDifference > 150) {
        setIsKeyboardOpen(true);
        setViewportHeight(currentHeight);
      } else {
        setIsKeyboardOpen(false);
        setViewportHeight(initialHeight);
      }
    };

    // Handle visual viewport API if available (better for mobile)
    if (window.visualViewport) {
  const handleVisualViewportChange = () => {
    const height = window.visualViewport.height;
    setIsKeyboardOpen(height < window.innerHeight - 150);
    setViewportHeight(height);
  };

  window.visualViewport.addEventListener('resize', handleVisualViewportChange);
  return () => {
    window.visualViewport.removeEventListener('resize', handleVisualViewportChange);
  };
} else {
      // Fallback to window resize
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Touch and keyboard optimization
  useEffect(() => {
    // Prevent zoom on double tap and improve touch handling
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      );
    }

    // Add touch-specific styles to body
    document.body.style.touchAction = 'manipulation';
    document.body.style.webkitTouchCallout = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.webkitTapHighlightColor = 'transparent';
    document.body.style.overflow = 'hidden';

    return () => {
      // Cleanup on unmount
      document.body.style.touchAction = '';
      document.body.style.webkitTouchCallout = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.webkitTapHighlightColor = '';
      document.body.style.overflow = '';
    };
  }, []);

  const handleContinue = () => {
    if (name.trim()) {
      // Instead of sessionStorage, we'll use React state/context or props
      // sessionStorage.setItem('userName', name.trim());
      navigate('/emotion-selection', { state: { userName: name.trim() } });
    } else {
      alert('Please enter your name to continue');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Simplified and more reliable focus handler
 const focusInput = () => {
  if (inputRef.current) {
    inputRef.current.focus({ preventScroll: true }); // Ensure no scroll interference
  }
};


  const handleInputFocus = () => {
  setIsKeyboardOpen(true);
  setTimeout(() => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300); // Slight delay for keyboard animation
};


  const handleInputBlur = () => {
    // Small delay before marking keyboard as closed
    setTimeout(() => {
      setIsKeyboardOpen(false);
    }, 100);
  };

  // Container style based on keyboard state
  const getContainerStyle = () => ({
  height: `${viewportHeight}px`,
  transition: 'padding-bottom 0.3s ease',
  paddingBottom: isKeyboardOpen ? '300px' : '0px', // Adjust as needed
});


  return (
    <AppBackground>
      <div 
        ref={containerRef}
        className="flex flex-col items-center justify-center px-4"
        style={getContainerStyle()}
      >
        <div className={`flex flex-col items-center w-full transition-all duration-300 ${
          isKeyboardOpen 
            ? 'space-y-4 gap-8' 
            : 'space-y-8 gap-20'
        }`}>
          
          {/* Title - Smaller when keyboard is open */}
          <h1 className={`text-white font-bold text-center font-poppins transition-all duration-300 ${
            isKeyboardOpen 
              ? 'text-[60px] leading-[65px]' 
              : 'text-[110px] leading-[113px]'
          }`}>
            Enter Your Name
          </h1>

          {/* Input Field - Enhanced for Touch */}
          <div className="w-full px-4">
            <div className="relative rounded-[30px] p-[2px]">
              <div
                className={`rounded-[28px] bg-[#191919] border border-white/20 backdrop-blur-md px-6 shadow-lg mx-auto cursor-pointer transition-all duration-300 ${
                  isKeyboardOpen 
                    ? 'py-8 w-3/4 hover:scale-[1.01] active:scale-[0.99]' 
                    : 'py-24 w-1/2 hover:scale-[1.02] active:scale-[0.98]'
                }`}
                style={{
                  background: 'linear-gradient(135deg, rgba(102,102,102,0.2), rgba(255,255,255,0.1))',
                  touchAction: 'manipulation',
                }}
                onClick={focusInput}
                onTouchStart={(e) => {
                  focusInput();
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Your Name"
                  className={`w-full bg-transparent text-white font-normal text-center font-poppins placeholder-white outline-none border-none caret-white transition-all duration-300 ${
                    isKeyboardOpen 
                      ? 'text-4xl leading-[32px]' 
                      : 'text-7xl leading-[48px]'
                  }`}
                  style={{
                    touchAction: 'manipulation',
                    WebkitUserSelect: 'text',
                    MozUserSelect: 'text',
                    msUserSelect: 'text',
                    userSelect: 'text',
                    WebkitTouchCallout: 'default',
                    WebkitTapHighlightColor: 'transparent',
                    fontSize: isKeyboardOpen ? '2.25rem' : '4.5rem',
                  }}
                  // HTML attributes for better virtual keyboard behavior
                  autoComplete="name"
                  autoCorrect="off"
                  autoCapitalize="words"
                  spellCheck="false"
                  inputMode="text"
                  enterKeyHint="done"
                  // Prevent zoom on iOS
                  onTouchStart={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>

          {/* Continue Button - Hidden when keyboard is open on small screens */}
          <div
            className={`transition-all duration-300 ${
              isKeyboardOpen ? 'scale-75 opacity-80' : 'scale-100 opacity-100'
            }`}
            style={{ 
              touchAction: 'manipulation',
              display: isKeyboardOpen && viewportHeight < 500 ? 'none' : 'block'
            }}
          >
            <CrawlingGradientButton onClick={handleContinue}>
              <div className={`text-white font-bold font-['Poppins'] tracking-[2px] transition-all duration-300 ${
                isKeyboardOpen 
                  ? 'text-[80px] leading-[90px] px-[80px] py-[16px]'
                  : 'text-[120px] leading-[135px] px-[126px] py-[26px]'
              }`}>
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