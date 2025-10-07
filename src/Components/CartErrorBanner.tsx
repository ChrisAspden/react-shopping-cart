import { useEffect } from "react";
import { useCart } from "../Context/CartContext";

export default function CartErrorBanner() {
  const { error, clearError } = useCart();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (!error) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-red-600 text-white px-4 py-3 rounded shadow-lg z-[9999]">
      <div className="flex items-center justify-between space-x-4">
        <span className="text-sm">{error.message}</span>
        <div className="flex items-center space-x-4"> {/* 👈 adds horizontal space */}
          <button
            onClick={error.retry}
            className="text-sm font-semibold underline hover:text-white"
          >
            Try again
          </button>
          <button
            onClick={clearError}
            className="text-sm font-semibold hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}


