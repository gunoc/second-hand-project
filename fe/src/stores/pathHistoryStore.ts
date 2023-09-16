import { create } from 'zustand';

type PathHistoryState = {
  prevPath: string;
  setPrevUrl: (url: string) => void;
};

export const usePathHistoryStore = create<PathHistoryState>((set) => ({
  prevPath: '',
  setPrevUrl: (url: string) => set({ prevPath: url }),
}));
