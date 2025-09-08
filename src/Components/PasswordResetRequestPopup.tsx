import React, { useState } from 'react';
import { requestPasswordReset } from '../Services/userService';

interface Props {
  onClose: () => void;
}

const PasswordResetRequestPopup: React.FC<Props> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { status, data } = await requestPasswordReset(email);
      setFeedback(data.message);
      setIsError(status !== 200);
      if (status === 200) {
        setTimeout(() => onClose(), 3000);
      }
    } catch {
      setFeedback('Something went wrong.');
      setIsError(true);
    }
  };

  return (
    <div className="bg-green-500 rounded-lg shadow-lg p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
      >
        ×
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Reset Your Password</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-sm"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Send Reset Email
        </button>
      </form>

      {feedback && (
        <p className={`text-sm mt-4 ${isError ? 'text-red-600' : 'text-white'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default PasswordResetRequestPopup;
