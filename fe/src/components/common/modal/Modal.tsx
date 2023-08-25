import { Theme, css } from '@emotion/react';
import React, { FC } from 'react';
import { Dim } from '../Dim';

type Props = {
  isOpen: boolean;
  isDimOpen: boolean;
  header: React.ReactNode;
  children: React.ReactNode;
};

export const Modal: FC<Props> = ({ isOpen, isDimOpen, header, children }) => {
  console.log('Modal render');

  return (
    <>
      {isOpen && (
        <div css={(theme) => ModalStyle(theme)}>
          <Dim isOpen={isDimOpen} />
          <div className="modal">
            {header}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

const ModalStyle = (theme: Theme) => {
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

    .modal {
      position: relative;
      z-index: 110;
      display: flex;
      width: 320px;
      height: 700px;
      box-sizing: border-box;
      flex-direction: column;
      align-items: flex-start;
      flex-shrink: 0;
      border-radius: 16px;
      background-color: ${theme.color.neutral.background};
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }
  `;
};
