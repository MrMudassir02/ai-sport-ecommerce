"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <div className="mb-5 text-6xl">🛒</div>

          <h1 className="mb-3 text-3xl font-bold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="mb-8 text-gray-500">
            Looks like you haven't added anything yet.
          </p>

          <Link
            href="/"
            className="inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Your Cart</h1>

      <p className="mb-10 text-gray-500">
        Review your selected products before checkout.
      </p>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* CART ITEMS */}

        <div className="space-y-5 lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-32 w-full rounded-xl object-cover sm:w-36"
              />

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {item.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">{item.category}</p>

                  <p className="mt-3 text-xl font-bold text-orange-500">
                    ₹{item.price}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  {/* QUANTITY */}

                  <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-2 py-1">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 font-bold hover:bg-gray-200"
                    >
                      −
                    </button>

                    <span className="min-w-6 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 font-bold text-white hover:bg-orange-500"
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE */}

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-sm font-semibold text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}

        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="space-y-4 border-b border-gray-200 pb-5">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between gap-4 text-sm"
              >
                <span className="text-gray-600">
                  {item.name} × {item.quantity}
                </span>

                <span className="font-semibold">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="my-6 flex justify-between text-xl font-bold">
            <span>Total</span>

            <span className="text-orange-500">₹{totalAmount}</span>
          </div>

          <Link
            href="/checkout"
            className="block w-full rounded-xl bg-orange-500 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
          >
            Proceed To Checkout →
          </Link>
        </div>
      </div>
    </main>
  );
}
