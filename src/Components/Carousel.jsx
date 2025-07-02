import React, { useState, useEffect } from 'react';

const images = [
  require('../Assets/Paintings/Completed Paint By Numbers/AutumnPark.png'),
  require('../Assets/Paintings/Completed Paint By Numbers/FloralEye.png'),
  require('../Assets/Paintings/Completed Paint By Numbers/Flowers.png'),
  require('../Assets/Paintings/Completed Paint By Numbers/TimeSquare1960s.png'),
];


const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden mb-4 mt-4">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={image} alt={`Slide ${index}`} className="max-w-full max-h-96 object-cover mx-auto" />
        </div>
      ))}
      <button
        onClick={() =>
          setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
        }
        className="absolute left-[30%] top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-900 transition duration-300"
      >
        {/* Left Arrow SVG*/}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button
        onClick={() =>
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }
        className="absolute right-[30%] top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-900 transition duration-300"
      >
          {/* Right Arrow SVG */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
          </svg>

      </button>
    </div>
  );
};

export default Carousel;