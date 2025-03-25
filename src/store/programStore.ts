import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Transaction {
  date: string;
  amount: number;
  note: string;
}

export interface Program {
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
      programs: [],
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
