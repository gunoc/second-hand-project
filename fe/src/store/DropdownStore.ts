import { create } from 'zustand';

interface DropdownStore {
  isOpen: boolean;
  autoClose: boolean;
  closeMenu: () => void;
  openMenu: () => void;
  setAutoClose: (value: boolean) => void;
}

export const useDropdownStore = create<DropdownStore>((set) => ({
  isOpen: false,
  autoClose: false,
  closeMenu: () => set({ isOpen: false }),
  openMenu: () => set({ isOpen: true }),
  setAutoClose: (value) => set({ autoClose: value }),
}));
