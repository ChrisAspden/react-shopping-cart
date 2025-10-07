import { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../Context/CartContext';
import CartDrawer from './CartDrawer'; // adjust path if needed

export default function CartIndicator() {
  const { items, total } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center focus:outline-none"
        aria-label="View cart"
      >
        <FiShoppingCart className="text-white text-2xl" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
            {count}
          </span>
        )}
        <span className="ml-2 text-sm text-white">
          ${total.toFixed(2)}
        </span>
      </button>

      {/* Drawer */}
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}


