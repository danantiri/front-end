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
          <p className="text-white-400 mt-2">
            💎 IDRX{" "}
            <a
              href={`https://sepolia-blockscout.lisk.com/address/0xf5C4C76590CdEd15ddb0e4C0464Ce17fE613fa46`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              Lisk Sepolia Testnet
            </a>
          </p>
        </div>
        <div>
          <h4 className="font-bold">Connect With Us</h4>
          <p className="text-white-400 mt-2">
            🐦{" "}
            <a
              href={`https://discord.gg/Jquvw5DqEv`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              Discord PBA
            </a>
          </p>
        </div>
      </div>
      <div className="text-center text-white-500 text-sm mt-6 border-t border-white-700 pt-4">
        © 2025 Danantiri. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
