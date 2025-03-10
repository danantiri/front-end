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
      accepted: "IDRX",
    },
    {
      name: "Global Education Fund",
      description:
        "Providing educational resources to underprivileged communities.",
      accepted: "IDRX",
    },
    {
      name: "Tech for All Initiative",
      description: "Bridging the digital divide through technology access.",
      accepted: "IDRX",
    },
  ]);

  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
    addressPIC: "",
    budget: "",
    accepted: "IDRX",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProgram((prev) => ({ ...prev, [name]: value }));
  };

  const addProgram = () => {
    if (newProgram.name && newProgram.description) {
      setPrograms([...programs, newProgram]);
      setNewProgram({
        name: "",
        description: "",
        addressPIC: "",
        budget: "",
        accepted: "IDRX",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold text-center">
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
            type="text"
            name="budget"
            value={newProgram.budget}
            onChange={handleInputChange}
            placeholder="Address PIC"
            className="w-full p-3 mt-3 border rounded-lg"
          />
          <button
            onClick={addProgram}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-500"
          >
            Add Program
          </button>
        </div>

        {/* List Program yang Ada */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-bold">Current Programs</h2>
          <div className="flex justify-center gap-6 mt-6 flex-wrap">
            {programs.map((program, index) => (
              <ProgramCard key={index} {...program} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
