import { usePopupStore } from '@/store/popupStore';
import { Alert } from '@components/common/alert/Alert';
import { AlertButtons } from '@components/common/alert/AlertButtons';
import { AlertContent } from '@components/common/alert/AlertContent';
import { LocationModal } from '@components/common/modal/locationModal/LocationModal';
import { FC } from 'react';
// 모달, alert동작 test용 페이지
export const ModalTestPage: FC = () => {
  const { isOpen, currentDim, togglePopup, setCurrentDim } = usePopupStore();

  const onOpenModal = () => {
    togglePopup('modal', true);
    setCurrentDim('modal');
  };

  return (
    <div>
      <button onClick={onOpenModal}>열어 모달</button>
      {/* 모달을 열어주는 역할의 요소가 필요합니다 */}

      {/* <CategoryModal /> */}
      {/* 사용처에서는 둘 중 하나만 렌더링 하면 됩니다 */}
      <LocationModal />
      {/* 내부에 각각의 open상태 및 모달 컨텐츠 변경 로직을 가지고 있어 사용처에서는 고려하지 않아도 됩니다 */}

      <Alert isOpen={isOpen.alert} currentDim={currentDim}>
        <AlertContent>'역삼1동'을 삭제하시겠어요?</AlertContent>
        <AlertButtons buttonText="취소" onDelete={() => {}} />
        <AlertButtons buttonText="취소" />
        {/* onDelete를 내려주지 않으면 buttonText로 이루어진 하나의 버튼만 렌더링 됩니다 (삭제 등 추가 기능이 필요하지 않은경우 onDelete 없이 사용하면 됩니다) */}
      </Alert>
      {/* 닫는 기능은 모달과 alert내부에서 이루어집니다*/}
    </div>
  );
};
