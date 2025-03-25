import React from "react";
import danaTiri from "../assets/tiri.jpeg";

const Navbar: React.FC = () => {
  const handleConnectWallet = () => {
    // Insert function to connect wallet
  };
  return (
    <nav className="flex justify-between items-center p-4 border-b bg-white">
      <div className="text-xl font-bold">
        <img src={danaTiri} className="w-52" />
      </div>
      <button
        className="bg-red-700 text-white px-4 py-2 rounded-lg"
        onClick={handleConnectWallet}
      >
        Connect Wallet
      </button>
    </nav>
  );
};

export default Navbar;
