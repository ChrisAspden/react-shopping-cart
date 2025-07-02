import React from 'react';
import Lottie from 'lottie-react';
import Nav from '../Assets/Animations/Nav.json';

const NavAnimation = () => (
  <div className="h-[80px] w-full flex justify-center items-center mix-blend-multiply rounded-b-md shadow-inner">
    <Lottie
      animationData={Nav}
      loop
      autoplay
      className="h-full w-auto max-w-[180px] object-contain scale-[1.3] mix-blend-multiply"
    />
  </div>
);
export default NavAnimation;