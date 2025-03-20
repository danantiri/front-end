import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-600 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
        <div>
          <h3 className="text-xl font-bold">Danantiri</h3>
          <p className="text-white-400 mt-2">
            Blockchain-Based Government Fund Tracking
          </p>
        </div>
        <div>
          <h4 className="font-bold">Supported Cryptocurrencies</h4>
          <p className="text-white-400 mt-2">💎 IDRX (Lisk Sepolia Testnet)</p>
        </div>
        <div>
          <h4 className="font-bold">Connect With Us</h4>
          <p className="text-white-400 mt-2">🐦 Discord PBA</p>
        </div>
      </div>
      <div className="text-center text-white-500 text-sm mt-6 border-t border-white-700 pt-4">
        © 2025 Danantiri. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
