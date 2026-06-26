import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function BarcodeScanner({ onScanSuccess }) {
  useEffect(() => {
    // Initialize the scanner
    const scanner = new Html5QrcodeScanner(
      "reader", // ID of the HTML element
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        supportedScanTypes: [0], // 0 = Camera only (disables file upload)
      },
      false,
    );

    // What happens when it successfully reads a code
    const handleScan = (decodedText) => {
      onScanSuccess(decodedText);
      // Optional: Pause scanning for a second to prevent duplicate rapid-fire scans
      scanner.pause(true);
      setTimeout(() => scanner.resume(), 1500);
    };

    const handleError = (err) => {
      // Ignore background errors (it constantly throws errors until it finds a barcode)
    };

    scanner.render(handleScan, handleError);

    // Cleanup function: Turns off the camera when the component unmounts
    return () => {
      scanner
        .clear()
        .catch((error) => console.error("Failed to clear scanner", error));
    };
  }, [onScanSuccess]);

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl border-2 border-slate-600">
      {/* The library will inject the video feed into this div */}
      <div id="reader"></div>
    </div>
  );
}
