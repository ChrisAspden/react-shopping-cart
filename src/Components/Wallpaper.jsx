import React from 'react';
import { useLocation } from 'react-router-dom';

const Wallpaper = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  console.log('Wallpaper component mounted');
  console.log('Current pathname:', location.pathname);
  console.log('isHome:', isHome);

  return (
    <>
      {/* Wallpaper Background */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full -z-10 bg-[url('/src/Assets/Wallpaper.png')] bg-cover bg-bottom bg-opacity-80 pointer-events-none"
      />

      {/* Attribution Overlay (only on home page) */}
      {isHome && (
        <div className="absolute bottom-14 left-4 z-[999] bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded 
                        opacity-0 hover:opacity-100 transition duration-300 pointer-events-auto">
          Background by{' '}
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
      )}
    </>
  );
};

export default Wallpaper;









