import { ButtonProps } from '@/components/common/button/Button';
import { DropdownContext } from '@/contexts/DropdownContext';
import { css } from '@emotion/react';
import { useState } from 'react';
import { MenuBoxProps } from '../menu/MenuBox';
import { Backdrop } from './Backdrop';

type Props = {
  opener: React.ReactElement<ButtonProps>;
  menu: React.ReactElement<MenuBoxProps>;
  align?: 'left' | 'right';
  autoClose?: boolean;
};

export const Dropdown: React.FC<Props> = ({
  opener,
  menu,
  align,
  autoClose = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!opener || !menu) {
    return null;
  }

  const openMenu = () => {
    const appLayout = document.getElementById('app-layout') as HTMLElement;
    appLayout.style.overflowY = 'hidden';
    setIsOpen(true);
  };

  const closeMenu = () => {
    const appLayout = document.getElementById('app-layout') as HTMLElement;
    appLayout.style.overflowY = 'auto';
    setIsOpen(false);
  };

  return (
    <DropdownContext.Provider value={{ autoClose, closeMenu }}>
      <div css={() => dropdownStyle(align)}>
        <div onClick={openMenu}>{opener}</div>
        {isOpen && (
          <>
            <Backdrop onClick={closeMenu} />
            {menu}
          </>
        )}
      </div>
    </DropdownContext.Provider>
  );
};

const dropdownStyle = (align?: 'left' | 'right') => css`
  position: relative;

  & ul {
    position: absolute;
    ${align ?? 'left'}: 0;
  }
`;
