import { Button } from '@/components/common/button/Button';
import { MenuBox } from '@components/common/menu/MenuBox';
import { ReactNode, isValidElement } from 'react';

export const findButton = (childrenArray: ReactNode[]) => {
  const button = childrenArray.find((child) => {
    return isValidElement(child) && child.type === Button;
  });

  return button;
};

export const findMenuBox = (childrenArray: ReactNode[]) => {
  const list = childrenArray.find((child) => {
    return isValidElement(child) && child.type === MenuBox;
  });

  return list;
};
