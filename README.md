# 🛒 Smart Retail POS & Self-Checkout System

A high-performance, responsive Point-of-Sale (POS) and self-checkout web application designed for modern retail environments. 

This project bridges the gap between web UI and physical hardware by integrating live camera feeds to scan real-world barcodes, combined with complex state management and fluid micro-interactions.

## ✨ Key Features

* **📸 Live Hardware Integration:** Utilizes device cameras to actively scan and decode physical barcodes/QR codes using `html5-qrcode`.
* **🧠 Complex State Management:** Intelligently handles cart logic, automatically grouping duplicate item scans into quantity multipliers and calculating real-time subtotals and taxes.
* **✨ Fluid UI/UX Animations:** Leverages Framer Motion for premium, staggered entrance animations and state transitions, preventing layout shifts during rapid data changes.
* **📱 Split-Screen Kiosk Layout:** Employs advanced CSS Grid and Flexbox within Tailwind CSS to ensure a flawlessly responsive, dark/light contrast UI optimized for tablet kiosks.
* **💳 Simulated Payment Gateway:** Features a dynamic verification modal that generates a simulated UPI/Smart Pay QR code contingent on the cart's active total.

## 🛠️ Tech Stack

* **Frontend Framework:** React.js (Bootstrapped with Vite)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **Hardware API:** HTML5-QRCode
