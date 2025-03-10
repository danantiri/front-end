import React from "react";

const ProgramCard: React.FC<{
  name: string;
  description: string;
  accepted: string;
}> = ({ name, description, accepted }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
      <p className="text-gray-500 text-xs mt-2">💰 Accepts {accepted}</p>
    </div>
  );
};

export default ProgramCard;
