import { DropdownContext } from '@/contexts/DropdownContext';
import { css } from '@emotion/react';
import { findButton, findMenuBox } from '@utils/findElement';
import { Children, useState } from 'react';
import { Backdrop } from './Backdrop';

type Props = {
  children?: React.ReactNode;
  align?: 'left' | 'right';
  autoClose?: boolean;
};

export const Dropdown: React.FC<Props> = ({
  children,
  align,
  autoClose = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const childrenArray = Children.toArray(children);

  const button = findButton(childrenArray);
  const menu = findMenuBox(childrenArray);

  if (!button || !menu) {
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
    <DropdownContext.Provider value={{ isOpen, autoClose, closeMenu }}>
      <div css={() => dropdownStyle(align)}>
        <div onClick={openMenu}>{button}</div>
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
