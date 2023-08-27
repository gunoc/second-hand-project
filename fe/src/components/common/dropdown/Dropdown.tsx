import { useDropdownStore } from '@/store/DropdownStore';
import { css } from '@emotion/react';
import { findButtonElement, findMenuBox } from '@utils/findElement';
import { Children, FC, ReactNode, useEffect } from 'react';
import { Backdrop } from './Backdrop';

type Props = {
  children?: ReactNode;
  align?: 'left' | 'right';
  autoClose?: boolean;
};

export const Dropdown: FC<Props> = ({ children, align, autoClose = false }) => {
  const { isOpen, setAutoClose, closeMenu, openMenu } = useDropdownStore();

  useEffect(() => {
    setAutoClose(autoClose);
  }, [autoClose, setAutoClose]);

  const childrenArray = Children.toArray(children);

  const button = findButtonElement(childrenArray);
  const menu = findMenuBox(childrenArray);

  if (!button || !menu) {
    return null;
  }

  return (
    <div css={() => dropdownStyle(align)}>
      <div onClick={openMenu}>{button}</div>
      {isOpen && (
        <>
          <Backdrop onClick={closeMenu} />
          {menu}
        </>
      )}
    </div>
  );
};

const dropdownStyle = (align?: 'left' | 'right') => css`
  position: relative;

  & ul {
    position: absolute;
    z-index: 9999;
    ${align ?? 'left'}: 0;
  }
`;
