import React from 'react';
import Lottie from 'lottie-react';
import Painting from '../../Assets/Animations/Painting.json';

const PaintingsDropdown = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="w-full h-full scale-[3.0] origin-center pointer-events-none">
      <Lottie
        animationData={Painting}
        loop
        autoplay
        className="w-full h-full object-cover pointer-events-none"
      />
    </div>
  </div>
);

export default PaintingsDropdown;
