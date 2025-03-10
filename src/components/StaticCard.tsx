import React from "react";

const StatCard: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 text-center w-full max-w-xs my-auto">
      <h4 className="text-gray-500 text-sm">{title}</h4>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default StatCard;
