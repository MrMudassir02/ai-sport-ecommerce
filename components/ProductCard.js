"use client";

import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <h2 className="mb-2 text-lg font-bold text-gray-900">{product.name}</h2>

        <p className="mb-4 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">₹{product.price}</h3>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          🛒 Add To Cart
        </button>
      </div>
    </div>
  );
}
