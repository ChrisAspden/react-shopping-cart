import React from 'react';
import Lottie from 'lottie-react';
import Models from '../../Assets/Animations/Models.json';

const ModelsDropdown = () => (
  <div className="h-[80px] w-full flex justify-center items-center bg-green-500 mix-blend-multiply rounded-b-md shadow-inner">
    <Lottie
      animationData={Models}
      loop
      autoplay
      className="h-full w-auto max-w-[180px] object-contain scale-[1.0] mix-blend-multiply"
    />
  </div>
);
export default ModelsDropdown;