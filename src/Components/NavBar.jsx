import React from 'react';
import Icon from '../Assets/WebsiteNavIcon.png';
import NavAnimation from './NavAnimation';


const NavBar = () => {
  return (
<nav className="bg-primary bg-opacity-90 text-white shadow-lg py-0">
  <div className="max-w-7xl mx-auto grid grid-cols-3 items-center px-6">
    {/* Left: Website Icon */}
    <div className="justify-self-start w-[330px] relative bg-primary">
      <a href="/">
        <img src={Icon} alt="Website Icon" className="w-full h-auto mix-blend-darken" />
      </a>
    </div>
    {/* Center: Animation */}
    <div className="flex justify-center items-center">
      <a
        href="https://lottiefiles.com/usamarazzaq"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Animation by Usama Razzaq"
        title="Woman Animation by Usama Razzaq"
        className="block">
        <NavAnimation className="ml-auto" />
      </a>
      
    </div>
  </div>
</nav>
 );
};

export default NavBar;