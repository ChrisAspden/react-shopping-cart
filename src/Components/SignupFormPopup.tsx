import React, { useState } from "react";
import { signupUser } from "../Services/userService";


interface SignupFormPopupProps {
  onClose: () => void;
}

const SignupFormPopup: React.FC<SignupFormPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data } = await signupUser(email, password);
    console.log("handleSignup fired with:", email, password);

    if (status === 201) {
      alert(data.message);
      // Reset form or close popup if needed
      } else {
      alert(data.message || "Signup failed");
      }
  };

return (
  <div className="w-72 transform scale-[0.9] origin-top-right bg-green-500 rounded-lg shadow-lg p-6 relative">
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

    <form onSubmit={handleSignup}>
      <label className="block mb-3">
        <span className="text-sm text-gray-700">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full border rounded p-2 text-sm"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-sm text-gray-700">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
