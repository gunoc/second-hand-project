import { ButtonProps } from '@components/common/button/Button';
import { css } from '@emotion/react';
import { cloneElement, useState } from 'react';
import { MenuBoxProps } from '../menu/MenuBox';
import { Backdrop } from './Backdrop';

type Props = {
  opener: React.ReactElement<ButtonProps>;
  menu: React.ReactElement<MenuBoxProps>;
  align?: 'left' | 'right';
};

export const Dropdown: React.FC<Props> = ({ opener, menu, align }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    const appLayout = document.getElementById('app-layout') as HTMLElement;
    appLayout.style.overflowY = 'hidden';
    setIsOpen(true);
  };

  const closeMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    const appLayout = document.getElementById('app-layout') as HTMLElement;
    appLayout.style.overflowY = 'auto';
    setIsOpen(false);
  };

  return (
    <div css={() => dropdownStyle(align)}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          openMenu();
        }}
      >
        {opener}
      </div>
      {isOpen && (
        <>
          <Backdrop
            onClick={(e) => {
              closeMenu(e); // BUG dropdown 버그로 인해 임시 추가
            }}
          />
          {cloneElement(menu, { onClick: closeMenu })}
        </>
      )}
    </div>
  );
};

const dropdownStyle = (align?: 'left' | 'right') => css`
  position: relative;
  z-index: 100;
  & ul {
    position: absolute;
    ${align ?? 'left'}: 0;
  }
`;
