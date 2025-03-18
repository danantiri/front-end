import React, { useState } from "react";
import Footer from "../components/Footer";
import ProgramCard from "../components/ProgramCard";
import StatCard from "../components/StaticCard";
import Navbar from "../components/Navbar";
import banner from "../assets/banner.jpg";

const DonationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [amount, setAmount] = useState(0);

  const presetAmounts = [10000, 50000, 100000, 500000];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-600 text-white p-8 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold text-center">Make a Donation</h2>
        <div className="mt-6">
          <p className="text-gray-300 text-center">Choose amount:</p>
          <div className="flex gap-3 mt-4 justify-center">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className={`px-5 py-3 rounded-lg transition ${
                  amount === amt
                    ? "bg-blue-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {amt.toLocaleString()} IDRX
              </button>
            ))}
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full mt-6 p-3 border border-gray-600 rounded-lg bg-gray-800 text-white text-center"
            placeholder="Enter custom amount"
          />
        </div>
        <div className="mt-6 flex justify-between">
          <button
            className="text-red-700 px-5 py-3 rounded-lg border border-red-500 bg-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-blue-500">
            Donate {amount.toLocaleString()} IDRX
          </button>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programs, setPrograms] = useState([
    {
      name: "Save The Ocean Foundation",
      description:
        "Supporting marine life conservation and ocean cleanup initiatives.",
      addressPIC: "0x772DEE8eA79F07C3CC88579f9f6Ad5FA6cBf4d5B",
    },
    {
      name: "Global Education Fund",
      description:
        "Providing educational resources to underprivileged communities.",
      addressPIC: "0x772DEE8eA79F07C3CC88579f9f6Ad5FA6cBf4d5B",
    },
    {
      name: "Tech for All Initiative",
      description: "Bridging the digital divide through technology access.",
      addressPIC: "0x772DEE8eA79F07C3CC88579f9f6Ad5FA6cBf4d5B",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <img src={banner} className="w-full h-[800px] bg-cover" />
      <main
        className="flex flex-col items-center justify-center flex-grow text-center"
        style={{ minHeight: "400px" }}
      >
        <h1 className="text-3xl font-bold text-red-600">
          Support Meaningful Projects with Crypto
        </h1>
        <p className="text-gray-600 mt-2 max-w-lg">
          Your allocate fund will be pooled and distributed to impactful
          programs
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg text-lg"
        >
          Support Now
        </button>
      </main>
      <section
        className="flex flex-wrap justify-center gap-6 p-6 bg-white shadow-md"
        style={{ minHeight: "200px" }}
      >
        <StatCard title="Total Pool Balance" value="12.5 IDRX" />
        <StatCard title="Total Support" value="156" />
        <StatCard title="Programs Funded" value="8" />
      </section>

      {/* Featured Organizations */}
      <section className="text-center py-12">
        <h2 className="text-2xl text-red-500 font-bold">Featured Programs</h2>
        <div className="flex justify-center gap-6 mt-6 flex-wrap">
          {programs.map((program, index) => (
            <ProgramCard key={index} {...program} />
          ))}
        </div>
      </section>

      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Footer />
    </div>
  );
};

export default Home;
