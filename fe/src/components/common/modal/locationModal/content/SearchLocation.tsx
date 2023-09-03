import { useState } from 'react';
import { css } from '@emotion/react';
import { Input } from '@/components/common/input/Input';
import { ModalListItem } from '../../ModalListItem';
import { ModalHeader } from '../../ModalHeader';
import { usePopupStore } from '@/store/popupStore';
import { useLocationWithQuery, usePatchMainLocation } from '@/hooks/location';

type Props = {
  // TODO : locationList의 타입 변경
  onToggleContent: (content: 'control' | 'search') => void;
};

export const SearchLocation: React.FC<Props> = ({ onToggleContent }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { locations, refetch, remove } = useLocationWithQuery(inputValue);
  const [locationList, setLocationList] = useState<LocationType[]>([]);
  // const [selectLocation, setSelectLocation] = useState<LocationType | null>(
  //   null,
  // );

  const patchMainLocationById = usePatchMainLocation();

  const { togglePopup, setCurrentDim } = usePopupStore();
  // TODO: 엔터를 입력하면 서버에서 검색된 동네 목록을 받아온다.
  // TODO: 동네는 시/도, 구/군, 동/읍/면 단위
  // TODO: 검색후 클릭시 대표 동네로 설정하면서 모달을 닫아버려야함, input도 비워야한다
  // TODO: localist는 없어져야함

  const onChangeInput = (value: string) => {
    setInputValue(value);
  };

  const onSearchLocation = async () => {
    await refetch();
    if (locations) {
      setLocationList(locations);
    }
  };

  const onChangeMainLocation = (id: number) => {
    patchMainLocationById(id);
    // setSelectLocation(null);
    setLocationList([]);
    setInputValue('');
    remove();
  };

  const onCloseModal = () => {
    togglePopup('modal', false);
    setCurrentDim(null);
    onToggleContent('control');
  };

  return (
    <>
      <ModalHeader
        onNavigateBack={() => onToggleContent('control')}
        onCloseModal={onCloseModal}
      />
      <div css={searchLocationStyle}>
        <div className="input__search">
          <Input
            onChange={onChangeInput}
            onPressEnter={onSearchLocation}
            placeholder="동명(읍, 면)으로 검색(ex. 서초동)"
            radius="s"
            variant="filled"
          />
        </div>

        {locationList && (
          <ul>
            {locationList.map((location) => (
              <ModalListItem
                key={location.id}
                name={location.name}
                onClick={() => {
                  onChangeMainLocation(location.id);
                  onCloseModal();
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

const searchLocationStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;

  .input__search {
    padding: 0 16px;
  }
`;
