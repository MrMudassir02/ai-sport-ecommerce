"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("/api/products");

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500"></div>

          <h1 className="text-xl font-semibold text-gray-700">
            Loading AI SPORT products...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* HERO */}

      <section className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-orange-400">
            Trusted Cricket Store
          </p>

          <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Premium Cricket Gear For
            <span className="text-orange-500"> Serious Players</span>
          </h1>

          <p className="max-w-xl text-lg text-gray-300">
            Discover premium cricket bats, gloves, helmets and accessories from
            AI SPORT.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 rounded-xl bg-orange-500 px-6 py-3 font-semibold transition hover:bg-orange-600"
          >
            Shop Now →
          </button>
        </div>
      </section>

      {/* PRODUCTS */}

      <section id="products" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
            Our Collection
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>

          <p className="mt-3 text-gray-500">
            Quality cricket equipment for every player.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold">No products available</h2>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
