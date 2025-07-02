import React from 'react';
import Lottie from 'lottie-react';
import CrossStitch from '../../Assets/Animations/Cross-Stitch.json';

const CrossStitchDropdown = () => (
  <div className="h-[80px] w-full flex justify-center items-center bg-green-500 mix-blend-multiply rounded-b-md shadow-inner">
    <Lottie
      animationData={CrossStitch}
      loop
      autoplay
      className="h-full w-auto max-w-[180px] object-contain scale-[1.0] translate-x-[5px] mix-blend-multiply"
    />
  </div>
);
export default CrossStitchDropdown;



