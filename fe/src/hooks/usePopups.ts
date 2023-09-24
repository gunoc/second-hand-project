import { usePopupStore } from '@stores/popupStore';

export const useAlert = () => {
  const { isOpen, currentDim, togglePopup, setCurrentDim } = usePopupStore();

  const openAlert = (source: AlertSourceType) => {
    togglePopup({ type: 'alert', source: source });
    setCurrentDim('alert');
  };

  const closeAlert = ({ currentDim }: { currentDim: PopupType | null }) => {
    togglePopup({ type: 'alert', source: null });
    setCurrentDim(currentDim);
  };

  return {
    alertSource: isOpen.alert.source,
    currentDim,
    onOpenAlert: openAlert,
    onCloseAlert: closeAlert,
  };
};

export const useModal = () => {
  const { isOpen, currentDim, togglePopup, setCurrentDim } = usePopupStore();

  const openModal = () => {
    togglePopup({ type: 'modal', open: true });
    setCurrentDim('modal');
  };

  const closeModal = ({ currentDim }: { currentDim: PopupType | null }) => {
    togglePopup({ type: 'modal', open: false });
    setCurrentDim(currentDim);
  };

  return {
    isModalOpen: isOpen.modal,
    currentDim,
    onOpenModal: openModal,
    onCloseModal: closeModal,
  };
};
