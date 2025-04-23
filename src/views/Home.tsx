import React, { useState } from "react";
import Footer from "../components/Footer";
import ProgramCard from "../components/ProgramCard";
import StatCard from "../components/StaticCard";
import Navbar from "../components/Navbar";
import banner from "../assets/tiri.png";
import ContributeModal from "../components/ContributeModal";
import { Program } from "../store/programStore";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { danantiriABI } from "../utils/abi";
import { erc20Abi, formatUnits, parseUnits } from "viem";
import { DANANTIRI_ADDRESS, IDRX_SEPOLIA } from "../constants";
import { waitForTransactionReceipt } from "wagmi/actions";
import { config } from "../provider";
import { liskSepolia } from "viem/chains";

const DonationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedProgram: Program | null;
}> = ({ isOpen, onClose, selectedProgram }) => {
  const { data: programHistories } = useReadContract({
    abi: danantiriABI,
    address: IDRX_SEPOLIA,
    functionName: "getProgramHistory",
    args: [BigInt(selectedProgram?.id ?? 0)],
    query: {
      enabled: !!selectedProgram,
    },
  });

  if (!isOpen || !selectedProgram) return null;

  const fundRaised = selectedProgram.fundRaised;
  const fundTarget = selectedProgram.fundTarget;

  const progressPercentage = Math.min((fundRaised / fundTarget) * 100, 100).toFixed(0);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative bg-gray-600 text-white p-8 rounded-lg shadow-lg w-[500px]">
        {/* Tombol Close */}
        <button className="absolute top-3 right-3 text-white text-2xl hover:text-gray-300" onClick={() => onClose()}>
          ✖
        </button>

        <h2 className="text-2xl font-bold text-center">{selectedProgram.name}</h2>
        <p className="text-gray-300 mt-2 text-center">{selectedProgram.description}</p>

        <div className="mt-4 text-sm text-center text-gray-400">
          PIC Address:{" "}
          <span className="text-gray-200">
            <a
              href={`https://sepolia-blockscout.lisk.com/address/${selectedProgram.addressPIC}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedProgram.addressPIC}
            </a>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <p className="text-gray-300 text-sm mb-2">Remaining Fund:</p>
          <div className="w-full bg-gray-800 rounded-full h-6">
            <div
              className="bg-red-500 h-6 rounded-full text-center text-xs font-bold text-black flex items-center justify-center"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-xs mt-2 text-center">
            {selectedProgram.fundRaised.toLocaleString()} IDRX / {selectedProgram.fundTarget.toLocaleString()} IDRX
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Withdraw History</h3>
          <table className="w-full text-left border border-gray-500 mt-3">
            <thead>
              <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Note</th>
              </tr>
            </thead>
            {(programHistories?.length ?? 0) > 0 ? (
              <tbody>
                {programHistories?.map((tx, idx: number) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">{formatUnits(tx.amount, 2)}</td>
                    <td className="border px-4 py-2">{new Date(Number(tx.timestamp) * 1000).toLocaleString()}</td>
                    <td className="border px-4 py-2">{tx.history}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td className="border text-center px-4 py-2" colSpan={3}>
                    No transactions available
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);

  const { address } = useAccount();

  // Mengambil semua program
  const { data: allPrograms } = useReadContract({
    abi: danantiriABI,
    address: DANANTIRI_ADDRESS,
    functionName: "getAllProgram",
  });

  // Mengambil Managed Fund Amount
  const { data: managedFundAmount } = useReadContract({
    abi: danantiriABI,
    address: DANANTIRI_ADDRESS,
    functionName: "totalManagedFund",
  });

  const formattedManagedFundAmount = formatUnits(managedFundAmount ?? BigInt(0), 2);

  // Handler untuk menampilkan modal dengan program yang dipilih
  const handleOpenModal = (program: Program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  // Fungsi untuk Approve IDRX
  const { writeContractAsync, isPending } = useWriteContract();

  const handleApprove = async (amount: number) => {
    if (isPending) {
      return;
    }
    if (!address) {
      alert("Please connect your wallet");
      return;
    }
    if (amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    const parsedAmount = parseUnits(amount.toString(), 2);

    const hash = await writeContractAsync({
      abi: erc20Abi,
      address: IDRX_SEPOLIA,
      functionName: "approve",
      args: [address, BigInt(parsedAmount)],
    });

    await waitForTransactionReceipt(config, {
      hash,
      chainId: liskSepolia.id,
    });

    alert(`Approved ${amount} IDRX`);
  };

  // Fungsi untuk send Contribute
  const handleContribute = async (amount: number) => {
    const parsedAmount = parseUnits(amount.toString(), 2);

    const hash = await writeContractAsync({
      abi: danantiriABI,
      address: IDRX_SEPOLIA,
      functionName: "sendFund",
      args: [BigInt(parsedAmount)],
    });

    await waitForTransactionReceipt(config, {
      hash,
      chainId: liskSepolia.id,
    });

    alert(`Contributed ${amount} IDRX`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main
        className="flex flex-col items-center justify-center p-8 flex-grow text-center"
        style={{ minHeight: "400px" }}
      >
        <img src={banner} className=" h-[300px] w-fit object-contain" />
        <h1 className="text-3xl font-bold text-red-600">Support Meaningful Projects with Crypto</h1>
        <p className="text-gray-600 mt-2 max-w-lg">
          Your allocated fund will be pooled and distributed to impactful programs.
        </p>
        <div>
          <button
            className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg w-full hover:bg-red-500"
            onClick={() => setIsContributeModalOpen(true)}
          >
            Contribute
          </button>
        </div>
      </main>
      <section className="flex flex-wrap justify-center gap-6 p-6 bg-white shadow-md" style={{ minHeight: "200px" }}>
        <StatCard title="Managed Fund Amount" value={`${Number(formattedManagedFundAmount).toLocaleString()} IDRX`} />
        <StatCard title="Programs Funded" value={`${allPrograms?.length ?? 0}`} />
      </section>

      {/* Featured Organizations */}
      <section className="text-center py-12">
        <h2 className="text-2xl text-red-500 font-bold">Featured Programs</h2>

        {(allPrograms?.length ?? 0) === 0 ? (
          <p className="mt-6 text-gray-500">No programs available at the moment.</p>
        ) : (
          <div className="flex justify-center gap-6 mt-6 flex-wrap">
            {allPrograms?.map((_program, index) => {
              const program: Program = {
                id: Number(_program.id),
                name: _program.name,
                description: _program.desc,
                addressPIC: _program.pic,
                fundRaised: Number(formatUnits(_program.allocated, 2)),
                fundTarget: Number(formatUnits(_program.target, 2)),
                transactions: [],
              };

              return <ProgramCard key={index} {...program} onClick={() => handleOpenModal(program)} />;
            })}
          </div>
        )}
      </section>

      <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedProgram={selectedProgram} />

      <ContributeModal
        isOpen={isContributeModalOpen}
        onClose={() => setIsContributeModalOpen(false)}
        onApprove={handleApprove}
        onContribute={handleContribute}
      />

      <Footer />
    </div>
  );
};

export default Home;
