import { useState } from 'react';
import { Modal } from '@components/common/modal/Modal';
import { usePopupStore } from '@/stores/popupStore';
import { ControlLocation } from './content/ControlLocation';
import { SearchLocation } from './content/SearchLocation';

export const LocationModal: React.FC = () => {
  const { isOpen, currentDim } = usePopupStore();
  const [toggleContent, setToggleContent] = useState<'control' | 'search'>(
    'control',
  );

  const onToggleContent = (content: 'control' | 'search') => {
    setToggleContent(content);
  };

  return (
    <Modal isOpen={isOpen.modal} currentDim={currentDim}>
      {toggleContent === 'control' ? (
        <ControlLocation onToggleContent={onToggleContent} />
      ) : (
        <SearchLocation onToggleContent={onToggleContent} />
      )}
    </Modal>
  );
};
