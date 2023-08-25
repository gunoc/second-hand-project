import { Theme, css } from '@emotion/react';
import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { Dim } from '../Dim';

type Props = {
  isOpen: boolean;
  isDimOpen: boolean;
  children: React.ReactNode;
};

export const Alert: FC<Props> = ({ isOpen, isDimOpen, children }) => {
  return (
    <>
      {isOpen && (
        <>
          {createPortal(
            <div css={(theme) => AlertStyle(theme)}>
              <Dim isOpen={isDimOpen} />
              <div className="alert">{children}</div>
            </div>,
            document.getElementById('root') as HTMLElement,
          )}
        </>
      )}
    </>
  );
};

const AlertStyle = (theme: Theme) => {
  return css`
    display: flex;
    width: 393px;
    height: 852px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 105;
    justify-content: center;
    align-items: center;

    .alert {
      position: relative;
      z-index: 110;
      display: flex;
      width: 336px;
      flex-direction: column;
      align-items: flex-start;
      border-radius: 16px;
      background-color: ${theme.color.neutral.background};
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }
  `;
};
