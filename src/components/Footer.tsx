import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
        <div>
          <h3 className="text-xl font-bold">Danatiri</h3>
          <p className="text-gray-400 mt-2">
            Making charitable giving accessible through cryptocurrency
          </p>
        </div>
        <div>
          <h4 className="font-bold">Supported Cryptocurrencies</h4>
          <p className="text-gray-400 mt-2">💎 IDRX</p>
        </div>
        <div>
          <h4 className="font-bold">Connect With Us</h4>
          <p className="text-gray-400 mt-2">🐦 Discord PBA</p>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        © 2025 Danatiri. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
