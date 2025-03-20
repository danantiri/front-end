import React, { useState } from "react";
import Footer from "../components/Footer";
import ProgramCard from "../components/ProgramCard";
import StatCard from "../components/StaticCard";
import Navbar from "../components/Navbar";
import banner from "../assets/banner.jpg";

const DonationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedProgram: {
    name: string;
    description: string;
    addressPIC: string;
    fundRaised: number;
    fundTarget: number;
  } | null;
}> = ({ isOpen, onClose, selectedProgram }) => {
  if (!isOpen || !selectedProgram) return null;

  const progressPercentage = Math.min(
    (selectedProgram.fundRaised / selectedProgram.fundTarget) * 100,
    100
  ).toFixed(0);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-600 text-white p-8 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold text-center">
          {selectedProgram.name}
        </h2>
        <p className="text-gray-300 mt-2 text-center">
          {selectedProgram.description}
        </p>

        <div className="mt-4 text-sm text-center text-gray-400">
          Wallet Address:{" "}
          <span className="text-gray-200">{selectedProgram.addressPIC}</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <p className="text-gray-300 text-sm mb-2">Fund Progress:</p>
          <div className="w-full bg-gray-800 rounded-full h-6">
            <div
              className="bg-red-500 h-6 rounded-full text-center text-xs font-bold text-black flex items-center justify-center"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-xs mt-2 text-center">
            {selectedProgram.fundRaised.toLocaleString()} IDRX /{" "}
            {selectedProgram.fundTarget.toLocaleString()} IDRX
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            className="text-red-700 px-5 py-3 rounded-lg border border-red-500 bg-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<{
    name: string;
    description: string;
    addressPIC: string;
    fundRaised: number;
    fundTarget: number;
  } | null>(null);

  const programs = [
    {
      name: "Save The Ocean Foundation",
      description:
        "Supporting marine life conservation and ocean cleanup initiatives.",
      addressPIC: "0x772DEE8eA79F07C3CC88579f9f6Ad5FA6cBf4d5B",
      fundRaised: 0,
      fundTarget: 10000,
    },
    {
      name: "Global Education Fund",
      description:
        "Providing educational resources to underprivileged communities.",
      addressPIC: "0x772DEE8eA79F07C3CC88579f9f6Ad5FA6cBf4d5B",
      fundRaised: 5000,
      fundTarget: 10000,
    },
    {
      name: "Tech for All Initiative",
      description: "Bridging the digital divide through technology access.",
      addressPIC: "0x772DEE8eA79F07C3CC88579f9f6Ad5FA6cBf4d5B",
      fundRaised: 0,
      fundTarget: 10000,
    },
  ];

  // Handler untuk menampilkan modal dengan program yang dipilih
  const handleOpenModal = (program: {
    name: string;
    description: string;
    addressPIC: string;
    fundRaised: number;
    fundTarget: number;
  }) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

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
          Your allocated fund will be pooled and distributed to impactful
          programs.
        </p>
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
            <ProgramCard
              key={index}
              {...program}
              onClick={() => handleOpenModal(program)} // Tambahkan handler klik
            />
          ))}
        </div>
      </section>

      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProgram={selectedProgram}
      />

      <Footer />
    </div>
  );
};

export default Home;
