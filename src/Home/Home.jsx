import React from 'react';
import Carousel from '../Components/Carousel';

const Home = () => {
  return (
    <div className="relative">
      {/* Attribution Overlay (only for Home) */}
      <div className="absolute bottom-2 left-2 z-10 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded 
                      opacity-0 hover:opacity-100 transition duration-300">
        Photo by{' '}
        <a
          href="https://unsplash.com/@steve_j?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Steve Johnson
        </a>{' '}
        on{' '}
        <a
          href="https://unsplash.com/photos/blue-orange-and-red-abstract-painting-y3Ne7MbdQ1E?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Unsplash
        </a>
      </div>

      <Carousel />
    </div>
  );
};

export default Home;

