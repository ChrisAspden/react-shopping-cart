import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Confirmed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: auto-open login modal or redirect after delay
    const timer = setTimeout(() => {
      navigate('/confirmed'); // or trigger modal logic here
    }, 5000); // adjust delay as needed

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-primary text-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto mt-24 text-center">
      <h1 className="text-2xl font-semibold mb-4">Email Confirmed ✅</h1>
        <p className="text-base">You’re all set. You can now log in and start using your account.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-green-500 text-black font-medium py-2 px-4 rounded hover:bg-gray-100 transition"
          >
          Return to Home
        </button>
    </div>
  );
};

export default Confirmed;
