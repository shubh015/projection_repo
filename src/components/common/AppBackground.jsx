// components/AppBackground.jsx
import React from 'react';

const AppBackground = ({ children, className = "" }) => {
  return (
    <div className={`relative w-full h-screen bg-primary overflow-hidden ${className}`}>
      {/* Main Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/img_gred_line_1_1080x1920.png')" }}
      />

      {/* Top Right Gradient Image */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          src="/images/img_gred_1_233x575.png"
          alt="Gradient decoration"
          className="absolute top-0 right-[-20vw] w-[50vw] min-w-[575px] max-w-[1012px] h-auto object-cover opacity-80
                     xl:right-[-15vw] xl:w-[45vw]
                     2xl:right-[23vw] 2xl:w-[40vw]
                     lg:right-[-25vw] lg:w-[55vw]
                     md:right-[-30vw] md:w-[60vw]"
        />
      </div>

      {/* Bottom Left Gradient Image */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          src="/images/img_gred_2.png"
          alt="Gradient decoration"
          className="absolute bottom-0 left-[-20vw] w-[50vw] min-w-[575px] max-w-[1012px] h-auto object-contain opacity-80
                     xl:left-[-15vw] xl:w-[45vw]
                     2xl:left-[23vw] 2xl:w-[40vw]
                     lg:left-[-25vw] lg:w-[55vw]
                     md:left-[-30vw] md:w-[60vw]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default AppBackground;