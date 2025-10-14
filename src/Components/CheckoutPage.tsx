import { useCart, CartItem } from "../Context/CartContext";

// Narrow type for checkout display
type CheckoutItem = Pick<CartItem, "productId" | "quantity" | "price" | "title">;

const CheckoutPage = () => {
  const { items } = useCart();

  if (items.length === 0) {
    return <p className="p-4">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-green-500 mt-12 rounded-lg shadow">
      {/* Centered page title */}
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      {/* Items table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Item</th>
            <th className="text-left p-2">Quantity</th>
            <th className="text-left p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: CheckoutItem) => (
            <tr key={item.productId} className="border-b">
              <td className="p-2">{item.title ?? "Unnamed product"}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="text-right mt-6 font-semibold text-lg">
        Total: $
        {items
          .reduce(
            (sum: number, item: CheckoutItem) =>
              sum + item.price * item.quantity,
            0
          )
          .toFixed(2)}
      </div>
    </div>
  );
};

export default CheckoutPage;



