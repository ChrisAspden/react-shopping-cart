import React, { useEffect, useRef, useState } from "react";
import { sendLoginRequest } from "../Services/authService";
import { useAuth } from "../Context/useAuth";
import PasswordResetRequestPopup from './PasswordResetRequestPopup';

interface LoginProps {
  onClose: () => void;
  onCreateAccount: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onCreateAccount }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showResetPopup, setShowResetPopup] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await sendLoginRequest(email, password);
      if (response.data.success) {
        login(response.data.email);
        onClose();
      } else {
        setErrorMsg(response.data.message || 'Invalid email or password');
        setTimeout(() => setErrorMsg(''), 3000);
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  const handleCreateAccount = () => {
    onClose();
    onCreateAccount();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="w-64 transform scale-[0.8] origin-top-right">
      {!showResetPopup ? (
        <div ref={modalRef} className="bg-green-500 rounded-lg shadow-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
          >
            ×
          </button>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">Login to Your Account</h2>

          {errorMsg && (
            <p className="text-sm text-red-600 mb-4">{errorMsg}</p>
          )}

          <form onSubmit={handleLogin}>
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-sm"
                required
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-sm"
                required
              />
            </label>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
            >
              Log In
            </button>
          </form>

          <div className="mt-4 text-sm text-center space-y-2">
            <p>
              New Customer?{" "}
              <button
                onClick={handleCreateAccount}
                className="text-blue-600 hover:underline"
              >
                Create your account
              </button>
            </p>
            <p>
              Lost Password?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setShowResetPopup(true)}
              >
                Recover password
              </button>
            </p>
          </div>
        </div>
      ) : (
        <PasswordResetRequestPopup onClose={() => setShowResetPopup(false)} />
      )}
    </div>
  );
};

export default Login;





