import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 border-b bg-white">
      <div className="text-xl font-bold">Danatiri</div>
      <button className="bg-gray-900 text-white px-4 py-2 rounded-lg">
        Connect Wallet
      </button>
    </nav>
  );
};

export default Navbar;
