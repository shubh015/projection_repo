// pages/NameEntry.jsx
import AppBackground from '@/components/common/AppBackground';
import CrawlingGradientButton from '@/components/ui/CrawlingGradientButton';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NameEntry = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

const handleContinue = () => {
  if (name.trim()) {
    sessionStorage.setItem("userName", name.trim()); 
    navigate('/emotion-selection', { state: { userName: name.trim() } });
  } else {
    alert('Please enter your name to continue');
  }
};


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <AppBackground>
      <div className="flex flex-col items-center justify-center h-full px-4 my-20">
        <div className="flex flex-col items-center space-y-8 w-full gap-20">
          {/* Title */}
          <h1 className="text-white text-[110px] font-bold leading-[113px] text-center font-poppins">
            Enter Your Name
          </h1>

          {/* Input Field */}
          <div className="w-full px-4">
            <div className="relative rounded-[30px] p-[2px]">
              <div
                className="rounded-[28px] bg-[#191919] border border-white/20 backdrop-blur-md px-6 py-24 shadow-lg w-1/2 mx-auto"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(102,102,102,0.2), rgba(255,255,255,0.1))',
                }}
              >
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Your Name"
                  className="w-full bg-transparent text-white text-7xl font-normal leading-[48px] text-center font-poppins placeholder-white outline-none border-none caret-white"
                />
              </div>
            </div>
          </div>

          {/* Continue Button */}
            <CrawlingGradientButton onClick={handleContinue}>
            <div className="text-white text-[120px] font-bold font-['Poppins'] leading-[135px] tracking-[2px] px-[126px] py-[26px]">
              Continue
            </div>
          </CrawlingGradientButton>
        </div>
      </div>
    </AppBackground>
  );
};

export default NameEntry;