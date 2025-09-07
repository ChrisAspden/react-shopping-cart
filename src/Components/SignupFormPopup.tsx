import React, { useState } from "react";
import { signupUser } from "../Services/userService";

interface SignupFormPopupProps {
  onClose: () => void;
}

const SignupFormPopup: React.FC<SignupFormPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback("");

    try {
      const { status, data } = await signupUser(email, password);
      console.log("handleSignup fired with:", email, password);

      if (status === 201) {
        setFeedback("✅ Account created! Please confirm via the link we emailed you.");
        setIsError(false);
      } else {
        setFeedback(data.message || "❌ Signup failed");
        setIsError(true);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setFeedback("Something went wrong. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
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
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
              ></path>
            </svg>
          ) : (
            "Sign Up"
          )}
        </button>

        {feedback && (
          <p className={`mt-4 text-sm ${isError ? "text-red-700" : "text-black"}`}>
            {feedback}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignupFormPopup;

