import React from "react";

const ProgramCard: React.FC<{
  name: string;
  description: string;
  addressPIC: string;
}> = ({ name, description, addressPIC }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
      <h3 className="font-bold text-red-600 text-lg">{name}</h3>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
      <p className="text-gray-500 text-xs mt-2">{addressPIC}</p>
    </div>
  );
};

export default ProgramCard;
