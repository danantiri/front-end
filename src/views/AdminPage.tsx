import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgramCard from "../components/ProgramCard";

const AdminPage: React.FC = () => {
  const [programs, setPrograms] = useState([
    {
      name: "Save The Ocean Foundation",
      description:
        "Supporting marine life conservation and ocean cleanup initiatives.",
      addressPIC: "0x772DEE8eA79F07C3CC88579f9f6Ad5FA6cBf4d5B",
      fundRaised: 50000,
      fundTarget: 100000,
    },
    {
      name: "Global Education Fund",
      description:
        "Providing educational resources to underprivileged communities.",
      addressPIC: "0x772DEE8eA79F07C3CC88579f9f6Ad5FA6cBf4d5B",
      fundRaised: 20000,
      fundTarget: 50000,
    },
    {
      name: "Tech for All Initiative",
      description: "Bridging the digital divide through technology access.",
      addressPIC: "0x772DEE8eA79F07C3CC88579f9f6Ad5FA6cBf4d5B",
      fundRaised: 0,
      fundTarget: 100000,
    },
  ]);

  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
    addressPIC: "",
    budget: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [allocationAmount, setAllocationAmount] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProgram((prev) => ({ ...prev, [name]: value }));
  };

  const addProgram = () => {
    if (newProgram.name && newProgram.description) {
      setPrograms([
        ...programs,
        {
          ...newProgram,
          fundRaised: 0,
          fundTarget: parseInt(newProgram.budget),
        },
      ]);
      setNewProgram({
        name: "",
        description: "",
        addressPIC: "",
        budget: "",
      });
    }
  };

  const openAllocateModal = (program: any) => {
    setSelectedProgram(program);
    setAllocationAmount("");
    setIsModalOpen(true);
  };

  const allocateFund = () => {
    if (!selectedProgram || !allocationAmount) return;

    setPrograms((prevPrograms) =>
      prevPrograms.map((program) =>
        program.name === selectedProgram.name
          ? {
              ...program,
              fundRaised: program.fundRaised + parseInt(allocationAmount),
            }
          : program
      )
    );

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow p-6">
        <h1 className="text-2xl text-red-500 font-bold text-center">
          Admin Panel - Manage Donation Programs
        </h1>

        {/* Form untuk Menambahkan Program */}
        <div className="bg-white p-6 shadow-md rounded-lg mt-6 max-w-lg mx-auto">
          <h2 className="text-lg font-semibold">Add New Program</h2>
          <input
            type="text"
            name="name"
            value={newProgram.name}
            onChange={handleInputChange}
            placeholder="Program Name"
            className="w-full p-3 mt-3 border rounded-lg"
          />
          <textarea
            name="description"
            value={newProgram.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-3 mt-3 border rounded-lg"
          />
          <input
            type="text"
            name="addressPIC"
            value={newProgram.addressPIC}
            onChange={handleInputChange}
            placeholder="Address PIC"
            className="w-full p-3 mt-3 border rounded-lg"
          />
          <input
            type="number"
            name="budget"
            value={newProgram.budget}
            onChange={handleInputChange}
            placeholder="Target Budget (IDRX)"
            className="w-full p-3 mt-3 border rounded-lg"
          />
          <button
            onClick={addProgram}
            className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg w-full hover:bg-red-500"
          >
            Add Program
          </button>
        </div>

        {/* List Program yang Ada */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-bold">Current Programs</h2>
          <div className="flex justify-center gap-6 mt-6 flex-wrap">
            {programs.map((program, index) => (
              <div key={index} className="relative">
                <ProgramCard
                  {...program}
                  onClick={() => openAllocateModal(program)}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal Dialog untuk Alokasi Dana */}
      {isModalOpen && selectedProgram && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-gray-600 text-white p-8 rounded-lg shadow-lg w-[500px]">
            {/* Tombol Close */}
            <button
              className="absolute top-2 right-2 text-white text-2xl hover:text-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-center">
              {selectedProgram.name}
            </h2>
            <p className="text-gray-300 mt-2 text-center">
              {selectedProgram.description}
            </p>

            <div className="mt-4 text-sm text-center text-gray-400">
              PIC Address:{" "}
              <span className="text-gray-200">
                {selectedProgram.addressPIC}
              </span>
            </div>

            <div>
              <button
                onClick={allocateFund}
                className="bg-red-500 w-full mt-4 text-white px-5 py-3 rounded-lg hover:bg-red-600"
              >
                Allocate
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <p className="text-gray-300 text-sm mb-2">Remaining Fund:</p>
              <div className="w-full bg-gray-800 rounded-full h-6">
                <div
                  className="bg-red-500 h-6 rounded-full text-center text-xs font-bold text-black flex items-center justify-center"
                  style={{
                    width: `${
                      (selectedProgram.fundRaised /
                        selectedProgram.fundTarget) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-gray-400 text-xs mt-2 text-center">
                {selectedProgram.fundRaised.toLocaleString()} IDRX /{" "}
                {selectedProgram.fundTarget.toLocaleString()} IDRX
              </p>
            </div>

            {selectedProgram.fundRaised > 0 ? (
              <>
                <input
                  type="number"
                  value={allocationAmount}
                  onChange={(e) => setAllocationAmount(e.target.value)}
                  className="w-full mt-4 p-3 border border-gray-600 rounded-lg bg-gray-800 text-white text-center"
                  placeholder="Enter amount"
                />
                <input
                  type="text"
                  value={allocationAmount}
                  onChange={(e) => setAllocationAmount(e.target.value)}
                  className="w-full mt-4 p-3 border border-gray-600 rounded-lg bg-gray-800 text-white text-center"
                  placeholder="Note"
                />

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={allocateFund}
                    className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-blue-500"
                  >
                    Withdraw
                  </button>
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
                    {selectedProgram.transactions ? (
                      <tbody>
                        {selectedProgram.transactions.map(
                          (tx: any, idx: number) => (
                            <tr key={idx}>
                              <td className="border px-4 py-2">{tx.amount}</td>
                              <td className="border px-4 py-2">
                                {tx?.date || ""}
                              </td>
                              <td className="border px-4 py-2">
                                {tx?.note || ""}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td
                            className="border text-center px-4 py-2"
                            colSpan={3}
                          >
                            No transactions available
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </>
            ) : (
              <div className="mt-6 flex justify-between">
                <button
                  className="text-red-700 px-5 py-3 rounded-lg border border-red-500 bg-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminPage;
