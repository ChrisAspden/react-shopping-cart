import React from 'react';
import Lottie from 'lottie-react';
import Knitting from '../../Assets/Animations/Knitting.json';

const KnittingDropdown = () => (
  <div className="h-[80px] w-full flex justify-center items-center bg-green-500 mix-blend-multiply rounded-b-md shadow-inner">
    <Lottie
      animationData={Knitting}
      loop
      autoplay
      className="h-full w-auto max-w-[180px] object-contain scale-[1.0] mix-blend-multiply"
    />
  </div>
);
export default KnittingDropdown;