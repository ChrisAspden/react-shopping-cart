import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/useAuth';
import { useUI } from "../Context/UIContext";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const { openLogin } = useUI();
  const navigate = useNavigate();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        {/* Drawer panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md bg-green-500 shadow-xl flex flex-col">
                  <div className="flex-1 overflow-y-auto p-6">
                    <DialogTitle className="text-lg font-bold">
                      Your Cart
                    </DialogTitle>

                    {items.length === 0 ? (
                      <p className="mt-4 text-black">Your cart is empty.</p>
                    ) : (
                      <div className="mt-6 space-y-4">
                        {items.map((item) => (
                          <div
                            key={item.productId}
                            className="flex items-start"
                          >
                            {item.imageUrl && (
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                            <div className="ml-4 flex-1">
                              <h3 className="font-bold">{item.title}</h3>
                              {item.description && (
                                <p className="text-sm text-black">
                                  {item.description}
                                </p>
                              )}
                              <div className="flex items-center mt-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.quantity - 1
                                    )
                                  }
                                  className="px-2 border rounded"
                                >
                                  -
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.quantity + 1
                                    )
                                  }
                                  className="px-2 border rounded"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="ml-4 text-right">
                              <p>
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <button
                                onClick={() => removeItem(item.id ?? item.productId)}
                                className="text-red-500 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t p-6">
                    <p className="text-lg font-bold">
                      Total: ${total.toFixed(2)}
                    </p>
                    {items.length > 0 &&
                      (user ? (
                        <button
                          onClick={() => {
                            onClose();
                            navigate("/checkout");
                          }}
                          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                        >
                          Checkout
                        </button>
                      ) : (
                        <p className="mt-4 text-sm text-gray-600">
                          Please{' '}
                          <button
                            onClick={() => {
                              onClose();
                              openLogin();
                            }}
                            className="text-indigo-600 underline"
                          >
                            log in
                          </button>{' '}
                          to checkout.
                        </p>
                      ))}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

