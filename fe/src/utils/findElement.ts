import { MenuBox } from '@components/common/menu/MenuBox';
import { ReactNode, isValidElement } from 'react';

export const findButtonElement = (childrenArray: ReactNode[]) => {
  const button = childrenArray.find((child) => {
    return isValidElement(child) && child.type === 'button';
  });

  return button;
};

export const findListElement = (childrenArray: ReactNode[]) => {
  const list = childrenArray.find((child) => {
    return isValidElement(child) && (child.type === 'ul' || child.type === MenuBox);
  });

  return list;
};
