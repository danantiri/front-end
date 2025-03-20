import React, { useState } from "react";

const ContributeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onApprove: (amount: number) => void;
  onContribute: (amount: number) => void;
}> = ({ isOpen, onClose, onApprove, onContribute }) => {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative bg-gray-600 text-white p-8 rounded-lg shadow-lg w-[400px]">
        {/* Tombol Close */}
        <button
          className="absolute top-3 right-3 text-white text-2xl hover:text-gray-300"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-center">Contribute to Pool</h2>
        <p className="text-gray-300 mt-2 text-center">
          Enter the amount you want to contribute.
        </p>

        {/* Input Amount */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mt-4 p-3 border border-gray-600 rounded-lg bg-gray-800 text-white text-center"
          placeholder="Enter amount in IDRX"
        />

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => onApprove(Number(amount))}
            className="bg-white-500 text-red-500 px-5 py-3 rounded-lg border border-red-500 bg-white"
          >
            Approve IDRX
          </button>

          <button
            onClick={() => onContribute(Number(amount))}
            className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600"
          >
            Contribute
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContributeModal;
