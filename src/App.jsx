import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Barcode,
  Trash2,
  CreditCard,
  Smartphone,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import BarcodeScanner from "./BarcodeScanner"; // <-- Importing your new camera component

// Sample product database
const PRODUCTS = [
  {
    id: 1,
    name: "Premium Basmati Rice 5kg",
    price: 850.0,
    category: "Grocery",
  },
  {
    id: 2,
    name: "Cold Pressed Sunflower Oil",
    price: 240.5,
    category: "Pantry",
  },
  { id: 3, name: "Organic Green Tea", price: 150.0, category: "Beverages" },
  { id: 4, name: "Desk Lamp - LED", price: 650.0, category: "Home" },
];

export default function SmartPOS() {
  const [cart, setCart] = useState([]);
  const [showQR, setShowQR] = useState(false);

  // <-- This replaces the old simulateScan function
  const handleRealScan = (decodedText) => {
    // In a real app, you would look up the decodedText in a database.
    // For now, we grab a random product to simulate a successful lookup.
    const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];

    setCart((prev) => {
      const existing = prev.find((item) => item.id === randomProduct.id);
      if (existing) {
        return prev.map((item) =>
          item.id === randomProduct.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...randomProduct, qty: 1, cartId: Date.now() }];
    });
  };

  const removeItem = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.05; // 5% GST simulation
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900 flex justify-center items-center">
      {/* Main Kiosk Container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] border border-slate-100">
        {/* Left Column: Scanning Area */}
        <div className="flex-1 bg-slate-900 p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>

          <div>
            <div className="flex items-center gap-3 text-white mb-12">
              <div className="bg-indigo-500 p-2 rounded-xl">
                <ShoppingBag size={24} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                SmartCheckout
              </h1>
            </div>

            {/* <-- This is where the new Camera Scanner UI lives */}
            <div className="text-center mt-12 relative z-10 bg-slate-800 p-4 rounded-3xl shadow-xl">
              <BarcodeScanner onScanSuccess={handleRealScan} />
              <p className="text-slate-400 font-medium mt-4">
                Hold barcode up to camera
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700 mt-8">
            <h3 className="text-slate-300 font-medium flex items-center gap-2 mb-2">
              <Barcode size={18} /> Hardware Status
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-400 font-medium">
                Camera Online
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Cart & Payment */}
        <div className="w-full md:w-[450px] lg:w-[500px] flex flex-col h-full bg-white">
          <div className="p-6 border-b border-slate-100 flex justify-between items-end">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Current Order
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {cart.length} items scanned
              </p>
            </div>
            <button
              onClick={() => setCart([])}
              className="text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Dynamic Cart List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            <AnimatePresence>
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-slate-400"
                >
                  <ShoppingBag size={48} className="mb-4 opacity-20" />
                  <p>Scan your first item to begin</p>
                </motion.div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.cartId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-slate-500">
                          Qty: {item.qty}
                        </span>
                        <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded-md text-slate-600">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-slate-800">
                        ₹{(item.price * item.qty).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.cartId)}
                        className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Checkout Footer */}
          <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-10">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>GST (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-800 pt-3 border-t border-slate-100">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold border-2 border-slate-200 text-slate-700 hover:border-slate-300 transition-colors">
                <CreditCard size={20} /> Card
              </button>
              <button
                onClick={() => total > 0 && setShowQR(true)}
                className={`flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all ${total > 0 ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20" : "bg-slate-300 cursor-not-allowed"}`}
              >
                <Smartphone size={20} /> Smart Pay QR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Payment Modal Overlay */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Verify & Pay
              </h3>
              <p className="text-slate-500 mb-6">
                Scan the QR code with any UPI or Smart Payment app to complete
                your ₹{total.toFixed(2)} purchase.
              </p>

              <div className="w-48 h-48 mx-auto bg-slate-100 rounded-2xl border-2 border-slate-200 flex items-center justify-center mb-6">
                <div className="grid grid-cols-5 grid-rows-5 gap-1 w-32 h-32 opacity-80">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`bg-slate-800 rounded-sm ${Math.random() > 0.4 ? "opacity-100" : "opacity-0"}`}
                    ></div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setCart([]);
                  setShowQR(false);
                }}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
              >
                Cancel Payment
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
