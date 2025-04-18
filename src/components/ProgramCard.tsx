import React from "react";

const ProgramCard: React.FC<{
  name: string;
  description: string;
  addressPIC: string;
  onClick: () => void;
}> = ({ name, description, addressPIC, onClick }) => {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <h3 className="font-bold text-red-600 text-lg">{name}</h3>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
      <p className="text-gray-500 text-xs mt-2">
        <a
          href={`https://sepolia-blockscout.lisk.com/address/${addressPIC}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {addressPIC}
        </a>
      </p>
    </div>
  );
};

export default ProgramCard;
