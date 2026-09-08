"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "cod",
  });

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("ORDER DETAILS");

    console.log({
      customer: formData,
      products: cart,
      totalAmount,
    });

    setOrderPlaced(true);

    clearCart();
  };

  if (orderPlaced) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">
          <div className="mb-6 text-7xl">🎉</div>

          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>

          <p className="mb-8 text-gray-500">
            Thank you for shopping with AI SPORT. We will contact you soon
            regarding your order.
          </p>

          <Link
            href="/"
            className="inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">Your Cart is Empty</h1>

          <Link
            href="/"
            className="rounded-xl bg-orange-500 px-6 py-3 text-white"
          >
            Go Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
          Secure Checkout
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Complete Your Order
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* ADDRESS FORM */}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm lg:col-span-2"
        >
          <h2 className="mb-6 text-xl font-bold">Delivery Address</h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full Name
              </label>

              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Phone Number
              </label>

              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold">
              Complete Address
            </label>

            <textarea
              required
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House number, street, area"
              rows="4"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">City</label>

              <input
                required
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                PIN Code
              </label>

              <input
                required
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter PIN code"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>
          </div>

          {/* PAYMENT */}

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold">Payment Method</h2>

            <div className="space-y-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 hover:border-orange-500">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={formData.payment === "cod"}
                  onChange={handleChange}
                />

                <div>
                  <p className="font-semibold">Cash On Delivery</p>

                  <p className="text-sm text-gray-500">
                    Pay when your order arrives.
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 hover:border-orange-500">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={formData.payment === "upi"}
                  onChange={handleChange}
                />

                <div>
                  <p className="font-semibold">UPI / Online Payment</p>

                  <p className="text-sm text-gray-500">
                    Payment gateway integration coming soon.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-xl bg-gray-900 py-4 font-semibold text-white transition hover:bg-orange-500"
          >
            Place Order
          </button>
        </form>

        {/* ORDER SUMMARY */}

        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold">Your Order</h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between gap-4 border-b pb-4 text-sm"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>

                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>

                <p className="font-bold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between text-xl font-bold">
            <span>Total</span>

            <span className="text-orange-500">₹{totalAmount}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
