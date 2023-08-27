import { FC } from 'react';
import { useTheme } from '@emotion/react';
import { Modal } from '@components/common/modal/Modal';
import { ModalHeader } from '@components/common/modal/ModalHeader';
import { ReactComponent as XIcon } from '@assets/x.svg';
import { Button } from '@components/common/button/Button';
import { useModalStore } from '@store/PopupStore';
import { useAlertStore } from '@store/PopupStore';
import { Alert } from '@components/common/alert/Alert';
import { AlertContent } from '@components/common/alert/AlertContent';
import { AlertButtons } from '@components/common/alert/AlertButtons';
import { ModalList } from '@components/common/modal/ModalList';
import { ModalListItem } from '@components/common/modal/ModalListItem';
// 모달, alert동작 test용 페이지
export const TestPage: FC = () => {
  const theme = useTheme();
  const {
    alert,
    alertDim,
    openAlert,
    closeAlert,
    openAlertDim,
    closeAlertDim,
  } = useAlertStore();

  const {
    modal,
    modalDim,
    openModal,
    closeModal,
    openModalDim,
    closeModalDim,
  } = useModalStore();

  const modalOpenHandler = () => {
    openModal();
    openModalDim();
  };

  const modalCloseHandler = () => {
    closeModal();
    closeModalDim();
  };

  const alertOpenHandler = () => {
    openAlert();
    openAlertDim();
    closeModalDim();
  };

  const alertCloseHandler = () => {
    closeAlert();
    closeAlertDim();
    openModalDim();
  };

  const modalList = [
    { id: 0, text: '역삼1동' },
    { id: 1, text: '역삼2동' },
    { id: 2, text: '역삼3동' },
    { id: 3, text: '역삼4동' },
    { id: 4, text: '역삼5동' },
    { id: 5, text: '역삼6동' },
    { id: 6, text: '역삼7동' },
    { id: 7, text: '역삼8동' },
    { id: 8, text: '역삼9동' },
    { id: 9, text: '역삼10동' },
  ];

  return (
    <div
      css={{
        width: '100%',
        height: '100%',
      }}
    >
      <button onClick={modalOpenHandler}>열어 모달</button>

      <Modal
        isOpen={modal}
        isDimOpen={modalDim}
        header={
          <ModalHeader>
            <span>동네 설정</span>

            <Button variant="text" onClick={modalCloseHandler}>
              <XIcon stroke={theme.color.neutral.textStrong} />
            </Button>
          </ModalHeader>
        }
      >
        <ModalList>
          {modalList.map((item) => (
            <ModalListItem
              onClick={() => console.log(item.id)}
              text={item.text}
              key={item.id}
            />
          ))}
        </ModalList>

        <button onClick={alertOpenHandler}>열어 Alert</button>
      </Modal>

      <Alert isOpen={alert} isDimOpen={alertDim}>
        <AlertContent>'역삼1동'을 삭제하시겠어요?</AlertContent>
        <AlertButtons>
          <Button variant="text" onClick={alertCloseHandler}>
            취소
          </Button>
          <Button
            css={{ color: theme.color.system.warning }}
            variant="text"
            onClick={alertCloseHandler}
          >
            삭제
          </Button>
        </AlertButtons>
      </Alert>
    </div>
  );
};
