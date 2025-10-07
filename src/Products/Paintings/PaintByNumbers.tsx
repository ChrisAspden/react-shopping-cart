import React, { useEffect, useState } from 'react';
import { useCart } from '../../Context/CartContext';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number | string;
  imageUrl: string;
  category: string;
  subcategory: string;
  stock: number;
}

export default function PaintByNumbers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'http://localhost:3001/api/products?subcategory=Paint%20By%20Numbers'
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('❌ Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-24">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24">
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow bg-green-500">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-black flex-grow">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  <button
                    onClick={() =>
                      addItem({
                        productId: product.id,
                        quantity: 1,
                        price: Number(product.price),
                        title: product.title,
                        description: product.description,
                        imageUrl: product.imageUrl,
                      })
                    }
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}






