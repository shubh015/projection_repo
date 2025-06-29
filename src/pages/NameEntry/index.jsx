// pages/NameEntry.jsx
import AppBackground from '@/components/common/AppBackground';
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
                className="rounded-[28px] bg-[#191919] border border-white/20 backdrop-blur-md px-6 py-16 shadow-lg w-1/3 mx-auto"
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
                  className="w-full bg-transparent text-white text-6xl font-normal leading-[48px] text-center font-poppins placeholder-white outline-none border-none caret-white"
                />
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="relative rounded-[26px] p-[10px] hover:scale-105 transition-all duration-200"
            style={{
              background:
                'linear-gradient(45deg, #DE9000 0%, #048B43 25%, #3849BE 50%, #DE0026 75%, #DE9000 100%)',
            }}
          >
            <div className="text-white text-[85px] font-bold font-['Poppins'] leading-[78px] tracking-[2px] rounded-[26px] px-[124px] py-[35px] flex items-center justify-center w-full h-full bg-[#191919]">
              Continue
            </div>
          </button>
        </div>
      </div>
    </AppBackground>
  );
};

export default NameEntry;