import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Transaction {
  date: string;
  amount: number;
  note: string;
}

export interface Program {
  id: number;
  name: string;
  description: string;
  addressPIC: string;
  fundRaised: number;
  fundTarget: number;
  transactions?: Transaction[];
}

interface ProgramStore {
  programs: Program[];
  addProgram: (program: Program) => void;
  updateFund: (name: string, amount: number, note?: string) => void;
  setPrograms: (programs: Program[]) => void;
}

export const useProgramStore = create<ProgramStore>()(
  persist(
    (set) => ({
      programs: [
        {
          id: 1,
          addressPIC: "0x1234567890123456789012345678901234567890",
          description: "Test",
          fundRaised: 0,
          fundTarget: 1000,
          name: "Test",
          transactions: [],
        },
      ],
      addProgram: (program) =>
        set((state) => ({
          programs: [...state.programs, program],
        })),
      updateFund: (name, amount, note = "") =>
        set((state) => ({
          programs: state.programs.map((p) =>
            p.name === name
              ? {
                  ...p,
                  fundRaised: p.fundRaised + amount,
                  transactions: [
                    ...(p.transactions || []),
                    {
                      date: new Date().toLocaleString(),
                      amount,
                      note,
                    },
                  ],
                }
              : p
          ),
        })),
      setPrograms: (programs) => set({ programs }),
    }),
    {
      name: "program-storage", // nama key di localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
