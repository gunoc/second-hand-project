import { Theme, css } from '@emotion/react';
import { useAnimation } from '@hooks/useAnimation';
import { useState } from 'react';
import { Button } from '../common/button/Button';
import { MapPinFilled, X } from '../common/icons';

type Props = {
  selectedLocation?: LocationType;
  locations?: LocationType[];
  onSelectLocation: (location: LocationType) => void;
};

export const LocationSelector: React.FC<Props> = ({
  selectedLocation,
  locations,
  onSelectLocation,
}) => {
  const [isContainerOpen, setIsContainerOpen] = useState(false);
  const { shouldRender, handleTransitionEnd, animationTrigger } =
    useAnimation(isContainerOpen);

  const openLocationContainer = () => {
    setIsContainerOpen(true);
  };

  const closeLocationContainer = () => {
    setIsContainerOpen(false);
  };

  const onSelectLocationButton = (location: LocationType) => {
    onSelectLocation(location);
    closeLocationContainer();
  };

  return (
    <div css={(theme) => locationSelectorStyle(theme, animationTrigger)}>
      <Button variant="text" onClick={openLocationContainer}>
        <MapPinFilled className="location__pin-icon" />
        {selectedLocation?.name}
      </Button>
      {locations && shouldRender && (
        <div className="location__container">
          <ul
            className="location__container--location-btns"
            onTransitionEnd={handleTransitionEnd}
          >
            {locations.map((location) => (
              <li key={location.id}>
                <Button
                  variant="category"
                  state={
                    selectedLocation?.id === location.id ? 'active' : 'default'
                  }
                  onClick={() => onSelectLocationButton(location)}
                >
                  {location.name}
                </Button>
              </li>
            ))}
          </ul>
          <Button
            variant="text"
            onClick={closeLocationContainer}
            className="location__container--close-btn"
          >
            <X />
          </Button>
        </div>
      )}
    </div>
  );
};

const locationSelectorStyle = (theme: Theme, animationTrigger: boolean) => css`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;

  .location__pin-icon {
    fill: ${theme.color.neutral.textStrong};
  }

  .location__container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${animationTrigger ? '' : 'transform: translateY(100%);'};
    background-color: ${theme.color.neutral.backgroundWeak};
    transition: 200ms ease;

    &--location-btns {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &--close-btn > svg {
      stroke: ${theme.color.neutral.textWeak};
    }
  }
`;
