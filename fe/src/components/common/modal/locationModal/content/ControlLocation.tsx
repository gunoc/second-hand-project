import React, { useState, useEffect } from 'react';
import { Button } from '@components/common/button/Button';
import { Theme, css } from '@emotion/react';
import { Plus, CircleXFilled } from '@components/common/icons';
import { usePopupStore } from '@store/popupStore';
import {
  useDeleteLocation,
  useMyLocations,
  usePatchMainLocation,
} from '@/hooks/location';
import { Alert } from '@/components/common/alert/Alert';
import { AlertContent } from '@/components/common/alert/AlertContent';
import { AlertButtons } from '@/components/common/alert/AlertButtons';
import { ModalHeader } from '../../ModalHeader';

type Props = {
  onToggleContent: (content: 'control' | 'search') => void;
};

export const ControlLocation: React.FC<Props> = ({ onToggleContent }) => {
  const { locations } = useMyLocations();
  const deleteLocationById = useDeleteLocation(); // TODO delete, patch 에러 핸들링
  const patchMainLocationById = usePatchMainLocation();
  const { isOpen, currentDim, togglePopup, setCurrentDim } = usePopupStore();

  const [locationsList, setLocationsList] = useState<LocationType[]>([]);
  const [selectLocation, setSelectLocation] = useState<LocationType | null>(
    null,
  );

  useEffect(() => {
    if (locations) {
      setLocationsList(locations);
    }
  }, []);

  const onAlertOpen = (location: LocationType) => {
    togglePopup('alert', true);
    setCurrentDim('alert');
    setSelectLocation(location);
  };

  const onAlertClose = () => {
    togglePopup('alert', false);
    setCurrentDim('modal');
  };

  const onCloseModal = () => {
    togglePopup('modal', false);
    setCurrentDim(null);
  };

  const onDeleteLocation = (id?: number) => {
    if (id == null) return;
    onAlertClose();
    deleteLocationById(id);
    setLocationsList((prevLocations) =>
      prevLocations
        .filter((location) => location.id !== id)
        .map((location) => ({
          ...location,
          isMainLocation: true,
        })),
    );
  };

  const onChangeMainLocation = () => {
    // 모달을 닫을 때만 변경 요청을 보낸다
    selectLocation && patchMainLocationById(selectLocation.id);
    setSelectLocation(null);
  };

  const onSelectLocation = (selectedLocation: LocationType) => {
    // 화면에 표시되는 ui만 바꿈(색상 변경)
    setLocationsList((prevLocations) =>
      prevLocations.map((location) => ({
        ...location,
        isMainLocation: location.id === selectedLocation.id,
      })),
    );

    // 선택된 동네로 요청을 보내기 위해 상태에 저장
    setSelectLocation(selectedLocation);
  };

  const isUser = true; // TODO 로그인한 유저인지 아닌지 확인 필요
  const shouldBlockDelete = locations?.length === 1;
  const shouldBlockAdd = locations?.length === 2;

  return (
    <>
      <ModalHeader
        title="동네 설정"
        onCloseModal={() => {
          onCloseModal();
          onChangeMainLocation();
        }}
      />
      <div css={controlLocationStyle}>
        <div className="noticeText">
          <p>지역은 최소 1개,</p>
          <p>최대 2개까지 설정 가능해요.</p>
        </div>
        <div className="buttons">
          {locationsList &&
            locationsList.map((location) => (
              <LocationButton
                key={location.id}
                isMainLocation={location.isMainLocation}
                onClick={() => {
                  onSelectLocation(location);
                }}
              >
                {location.name}
                <CircleXFilled
                  className="buttons__location__x-icon"
                  onClick={(event) => {
                    event?.stopPropagation();
                    onAlertOpen(location);
                  }}
                />
              </LocationButton>
            ))}

          <Button
            className="buttons__add"
            variant="rectangle"
            size="l"
            state="default"
            onClick={() => {
              if (!shouldBlockAdd) {
                onToggleContent('search');
              }
            }}
            disabled={shouldBlockAdd} // TODO user인지 아닌지 추가하기
          >
            <Plus className="buttons__plus-icon" />
            추가
          </Button>
        </div>

        <Alert isOpen={isOpen.alert} currentDim={currentDim}>
          {shouldBlockDelete ? (
            <>
              <AlertContent>
                동네는 최소 1개 이상 선택해야해요.
                <br />
                새로운 동네를 등록한 후, 삭제해주세요
              </AlertContent>
              <AlertButtons buttonText="닫기" />
            </>
          ) : (
            <>
              <AlertContent>
                '{selectLocation?.name}'을 삭제하시겠어요?
              </AlertContent>
              <AlertButtons
                buttonText="취소"
                onDelete={() => onDeleteLocation(selectLocation?.id)}
              />
            </>
          )}
        </Alert>
      </div>
    </>
  );
};

type LocationButtonProps = {
  isMainLocation: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

const LocationButton: React.FC<LocationButtonProps> = ({
  isMainLocation,
  children,
  onClick,
}) => {
  return (
    <div
      css={(theme) => locationButtonStyle(theme, isMainLocation)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const locationButtonStyle = (theme: Theme, isMainLocation: boolean) => {
  return css`
    cursor: pointer;
    display: flex;
    padding: 16px;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    border-radius: 8px;
    font: ${theme.font.availableStrong16};
    color: ${theme.color.accent.text};
    background-color: ${isMainLocation
      ? theme.color.accent.backgroundPrimary
      : theme.color.neutral.borderStrong};
  `;
};

const controlLocationStyle = (theme: Theme) => {
  return css`
    box-sizing: border-box;
    display: flex;
    padding: 40px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;

    .noticeText {
      width: 100%;
      color: ${theme.color.neutral.text};
      font: ${theme.font.displayDefault12};
      text-align: center;
      font-feature-settings: 'clig' off, 'liga' off;
    }

    .buttons {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      align-self: stretch;

      &__location {
        cursor: default;
        display: flex;
        padding: 16px;
        justify-content: space-between;
        align-items: center;
        gap: 4px;
        align-self: stretch;
        border-radius: 8px;
        font: ${theme.font.availableStrong16};
        color: ${theme.color.accent.text};
        background-color: ${theme.color.accent.backgroundPrimary};

        &__x-icon {
          fill: ${theme.color.accent.text};
          cursor: pointer;
          :hover {
            opacity: 0.6;
          }
        }
      }

      &__plus-icon {
        stroke: ${theme.color.accent.textWeak};
      }

      &__add {
        width: 100%;
      }
    }
  `;
};
