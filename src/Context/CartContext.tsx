import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useAuth } from "./useAuth";

interface CartItem {
  id?: number; // DB primary key (only for logged-in users)
  productId: number;
  quantity: number;
  price: number;
  title?: string;
  description?: string;
  imageUrl?: string;
}

interface CartError {
  message: string;
  retry: () => void;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (cartItemId: number) => void;
  clearCart: () => void;
  syncToBackend: (overrideUserId?: number) => Promise<void>;
  error?: CartError | null;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<CartError | null>(null);
  const { user } = useAuth();

  const firstRender = useRef(true);
  const hasMerged = useRef(false);

  // Load from localStorage on first render (guest only)
  useEffect(() => {
    if (user) return;
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setItems(JSON.parse(stored) || []);
      } catch {
        console.warn("Invalid cart data in localStorage, clearing it.");
        localStorage.removeItem("cart");
        setItems([]);
      }
    }
  }, [user]);

  // Save to localStorage whenever cart changes (guest only)
  useEffect(() => {
    if (user) return;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items, user]);

  const syncToBackend = useCallback(
    async (overrideUserId?: number) => {
      const idToUse = overrideUserId ?? user?.id;
      if (!idToUse) return;

      try {
        // Push guest items once on login
        if (!hasMerged.current) {
          for (const item of items) {
            await fetch("http://localhost:3001/api/cart/add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: idToUse,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                title: item.title,
                description: item.description,
                imageUrl: item.imageUrl,
              }),
            });
          }
          hasMerged.current = true;
          localStorage.removeItem("cart");
        }

        // Always hydrate from backend
        const res = await fetch(`http://localhost:3001/api/cart/${idToUse}`);
        if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`);
        const data = await res.json();

        setItems(
          data.map((ci: any) => ({
            id: ci.id,
            productId: ci.productId,
            quantity: ci.quantity,
            price: ci.price,
            title: ci.Product?.title,
            description: ci.Product?.description,
            imageUrl: ci.Product?.imageUrl,
          }))
        );

        console.log("✅ Cart synced and hydrated with DB ids");
      } catch (err) {
        console.error("❌ Failed to sync cart to backend:", err);
      }
    },
    [user?.id, items]
  );

  const addItem = async (item: CartItem) => {
    if (user?.id) {
      try {
        const res = await fetch("http://localhost:3001/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            productId: item.productId,
            quantity: item.quantity,
          }),
        });
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);

        await syncToBackend(user.id);
      } catch (err) {
        console.error("❌ Failed to add item to backend:", err);

        // Rollback optimistic update
        setItems((prev) => prev.filter((i) => i.productId !== item.productId));

        // Expose retry option
        setError({
          message: "Couldn't add item to cart.",
          retry: async () => {
            await addItem(item);
            clearError(); // hide banner after retry succeeds
          },
        });
      }
    } else {
      // Guest: update local state only
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === item.productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        }
        return [...prev, item];
      });
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      )
    );

    if (user?.id) {
      fetch("http://localhost:3001/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId, quantity }),
      }).catch((err) =>
        console.error("❌ Failed to update cart in backend:", err)
      );
    }
  };

  const removeItem = (identifier: number) => {
    if (user?.id) {
      fetch(`http://localhost:3001/api/cart/${identifier}`, { method: "DELETE" })
        .then((res) => {
          if (!res.ok) throw new Error(`Server responded with ${res.status}`);
          console.log("✅ Item removed from backend");
        })
        .catch((err) =>
          console.error("❌ Failed to remove cart item in backend:", err)
        );

      setItems((prev) => prev.filter((i) => i.id !== identifier));
    } else {
      // Guest: remove by productId
      setItems((prev) => prev.filter((i) => i.productId !== identifier));
    }
  };

  const clearCart = () => setItems([]);

  const total = items.reduce(
    (sum: number, i: CartItem) => sum + i.price * i.quantity,
    0
  );

  const clearError = () => setError(null);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        syncToBackend,
        error,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};













