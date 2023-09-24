import { ButtonProps } from '@components/common/button/Button';
import { css } from '@emotion/react';
import { useDropdownMenuPosition } from '@hooks/useDropdownMenuPosition';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { MenuBoxProps } from '../menu/MenuBox';
import { Backdrop } from './Backdrop';

type Props = {
  opener: React.ReactElement<ButtonProps>;
  menu: React.ReactElement<MenuBoxProps>;
};

export const Dropdown: React.FC<Props> = ({ opener, menu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { dropdownRef, dropdownMenuPositionStyle, calcDropdownMenuPosition } =
    useDropdownMenuPosition({
      appLayout: document.getElementById('app-layout') as HTMLElement,
    });

  const openMenu = (e: React.MouseEvent) => {
    e.stopPropagation();

    const appLayout = document.getElementById('app-layout') as HTMLElement;
    appLayout.style.overflowY = 'hidden';

    calcDropdownMenuPosition();
    setIsOpen(true);
  };

  const closeMenu = (e: React.MouseEvent) => {
    e.stopPropagation();

    const appLayout = document.getElementById('app-layout') as HTMLElement;
    appLayout.style.overflowY = 'auto';

    setIsOpen(false);
  };

  return (
    <div css={() => dropdownStyle()} ref={dropdownRef}>
      <div onClick={openMenu}>{opener}</div>
      {isOpen &&
        createPortal(
          <>
            <Backdrop onClick={closeMenu} />
            <div
              style={{
                position: 'absolute',
                zIndex: '100',
                ...dropdownMenuPositionStyle,
              }}
              onClick={closeMenu}
            >
              {menu}
            </div>
          </>,
          document.getElementById('dropdown-root') as HTMLElement,
        )}
    </div>
  );
};

const dropdownStyle = () => css`
  position: relative;
  z-index: 100;
`;
