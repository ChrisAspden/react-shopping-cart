// src/Components/SignupFormPopup.jsx
import React from "react";

const SignupFormPopup = ({ onClose }) => {
  console.log("onClose typeof:", typeof onClose);

  return (
    <div className="w-72 transform scale-[0.9] origin-top-right bg-green-500 rounded-lg shadow-lg p-6 relative border border-gray-200">
      <button
        type="button"
        onClick={() => {
          console.log("Close Button Clicked");
          onClose();
        }}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
      >
        ×
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Account</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Account created! Logged in.");
        }}
      >
        <label className="block mb-3">
          <span className="text-sm text-gray-700">Email</span>
          <input
            type="email"
            className="mt-1 w-full border rounded p-2 text-sm"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-gray-700">Password</span>
          <input
            type="password"
            className="mt-1 w-full border rounded p-2 text-sm"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupFormPopup;
