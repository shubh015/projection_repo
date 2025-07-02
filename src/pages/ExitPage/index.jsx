import AppBackground from '@/components/common/AppBackground';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ExitPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = location.state?.userName || sessionStorage.getItem('userName') || 'Guest';

  const [showTimer, setShowTimer] = useState(false);
  const [countdown, setCountdown] = useState(56); // 12 - 4 delay = 8 seconds of countdown

  useEffect(() => {
    const showTimerTimeout = setTimeout(() => {
      setShowTimer(true);
    }, 4000);

    let countdownInterval;

    // Start countdown only after 4s
    if (showTimer) {
      countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            sessionStorage.clear();
            navigate('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearTimeout(showTimerTimeout);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [showTimer, navigate]);

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

        .crawling-card-border {
          background: linear-gradient(
            90deg,
            rgba(222, 144, 0, 0.69) 0%,
            rgba(4, 139, 67, 0.69) 25%,
            rgba(56, 73, 190, 0.69) 50%,
            rgba(222, 0, 38, 0.69) 75%,
            rgba(222, 144, 0, 0.69) 100%,
            rgba(4, 139, 67, 0.69) 125%,
            rgba(56, 73, 190, 0.69) 150%,
            rgba(222, 0, 38, 0.69) 175%,
            rgba(222, 144, 0, 0.69) 200%
          );
          background-size: 200% 100%;
          animation: crawlGradient 4s linear infinite;
        }
      `}</style>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        {/* Crawling Gradient Border Wrapper */}
        <div className="crawling-card-border p-[7px] rounded-[71px]">
          {/* Inner Card */}
          <div
            className="rounded-[64px] flex flex-col items-center justify-center text-center px-[26rem] py-[10rem] backdrop-blur-sm relative"
            style={{ background: '#191919cc' }}
          >
            <div className="flex flex-col justify-center items-center gap-24">
              <h1 className="font-poppins font-bold text-white text-[150px] leading-[100%] mb-6">
                Have A Glance At Your Future
              </h1>

              <h2 className="font-poppins font-bold text-white text-[120px] leading-[100%] mb-8">
                {userName}
              </h2>

              <p className="font-poppins max-w-[97rem] font-medium text-white text-[60px] leading-[90px] mb-6">
                The brighter or more numerous the colorful threads in your carpet, the more intense
                the anger, ego, deceit, and greed you'll have in your future births.
              </p>

              <p className="font-whisper font-normal text-white text-[125px] leading-[120px] text-center">
                You are the master weaver of your future nature.
              </p>
            </div>

            {/* Timer */}
            {showTimer && (
              <div className="absolute bottom-10 right-10 text-white text-5xl font-bold font-poppins">
                Redirecting in {countdown}s
              </div>
            )}
          </div>
        </div>
      </div>
    </AppBackground>
  );
};

export default ExitPage;
