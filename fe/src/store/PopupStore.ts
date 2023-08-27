import { create } from 'zustand';

type ModalState = {
  modal: boolean;
  modalDim: boolean;
  openModal: () => void;
  closeModal: () => void;
  openModalDim: () => void;
  closeModalDim: () => void;
};

type AlertState = {
  alert: boolean;
  alertDim: boolean;
  openAlert: () => void;
  closeAlert: () => void;
  openAlertDim: () => void;
  closeAlertDim: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  modal: false,
  modalDim: false,
  openModal: () => set(() => ({ modal: true })),
  closeModal: () => set(() => ({ modal: false })),
  openModalDim: () => set(() => ({ modalDim: true })),
  closeModalDim: () => set(() => ({ modalDim: false })),
}));

export const useAlertStore = create<AlertState>((set) => ({
  alert: false,
  alertDim: false,
  openAlert: () => set(() => ({ alert: true })),
  closeAlert: () => set(() => ({ alert: false })),
  openAlertDim: () => set(() => ({ alertDim: true })),
  closeAlertDim: () => set(() => ({ alertDim: false })),
}));
