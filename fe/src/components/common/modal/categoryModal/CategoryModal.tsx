import { Modal } from '@components/common/modal/Modal';
import { ModalHeader } from '@components/common/modal/ModalHeader';
import { ModalListItem } from '@components/common/modal/ModalListItem';
import { usePopupStore } from '@stores/popupStore';

type Props = {
  categoryList?: CategoryType[];
  onSelectCategory: (id: number) => void;
};

export const CategoryModal: React.FC<Props> = ({
  categoryList,
  onSelectCategory,
}) => {
  const { isOpen, currentDim, togglePopup, setCurrentDim } = usePopupStore();

  const onCloseModal = () => {
    togglePopup('modal', false);
    setCurrentDim(null);
  };

  return (
    <Modal isOpen={isOpen.modal} currentDim={currentDim}>
      <ModalHeader title="카테고리" onCloseModal={onCloseModal} />
      {!categoryList ? (
        <div>...카테고리 로딩중</div>
      ) : (
        <ul>
          {categoryList.map((category) => (
            <ModalListItem
              name={category.name} // TODO props: data에 따라 수정
              key={category.id}
              onClick={() => {
                onSelectCategory(category.id);
                onCloseModal();
              }}
            />
          ))}
        </ul>
      )}
    </Modal>
  );
};
