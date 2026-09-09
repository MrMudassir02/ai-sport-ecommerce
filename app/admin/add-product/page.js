"use client";

import { useState } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/products", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage("Product added successfully!");

      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        image: "",
        stock: "",
      });
    } catch (error) {
      setMessage("Failed to add product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Add New Product</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg space-y-5"
        >
          {/* Product Name */}

          <div>
            <label className="block font-semibold mb-2">Product Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Category */}

          <div>
            <label className="block font-semibold mb-2">Category</label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Cricket, Football, Gym..."
              required
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Price */}

          <div>
            <label className="block font-semibold mb-2">Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Stock */}

          <div>
            <label className="block font-semibold mb-2">Stock Quantity</label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="How many products available?"
              required
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Image */}

          <div>
            <label className="block font-semibold mb-2">
              Product Image URL
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste product image URL"
              required
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Description */}

          <div>
            <label className="block font-semibold mb-2">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
              rows="4"
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>

          {/* Message */}
          {message && (
            <p
              className={`text-center font-semibold ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
