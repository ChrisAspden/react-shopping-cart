import React, { useEffect, useRef } from "react";

const Login = ({ onClose, onCreateAccount }) => {
  const modalRef = useRef(null);

  const handleCreateAccount = () => {
    onClose();
    onCreateAccount();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
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
      {/* Internal container — this is where you can scale or animate */}
      <div ref={modalRef} className="bg-green-500 rounded-lg shadow-lg p-6 relative">
        <button
          onClick={() =>{
            onClose();
            onCreateAccount();
          }}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Login to Your Account</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // handle login logic here
          }}
        >
          <label className="block mb-2">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-sm"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              type="password"
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
              onClick={() => console.log("Handle password recovery")}
              className="text-blue-600 hover:underline"
            >
              Recover password
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

