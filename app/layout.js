import "./globals.css";

import Navbar from "../components/Navbar";

import { CartProvider } from "../context/CartContext";

export const metadata = {
  title: "AI SPORT",
  description: "Premium Cricket Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <CartProvider>
          <Navbar />

          {children}
        </CartProvider>
      </body>
    </html>
  );
}
