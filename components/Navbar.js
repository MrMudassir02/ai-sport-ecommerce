"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              AI <span className="text-orange-500">SPORT</span>
            </h1>

            <p className="text-xs text-gray-500">Premium Cricket Store</p>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="hidden text-sm font-medium text-gray-600 hover:text-orange-500 md:block"
          >
            Products
          </Link>

          <Link
            href="/cart"
            className="relative rounded-lg bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-500"
          >
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
