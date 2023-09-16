import { css, Theme } from '@emotion/react';
import { createPortal } from 'react-dom';
type Props = {
  onClick?: (e: React.MouseEvent) => void; // BUG dropdown 버그로 인해 임시 추가
};

export const Backdrop: React.FC<Props> = ({ onClick }) => {
  return (
    <>
      {createPortal(
        <div css={(theme) => backdropStyle(theme)} onClick={onClick}></div>,
        document.getElementById('root') as HTMLElement,
      )}
    </>
  );
};

const backdropStyle = (theme: Theme) => css`
  position: fixed;
  z-index: 90;
  top: 0;
  width: 393px;
  height: 100vh;
  background-color: ${theme.color.neutral.overlay};
`;
// inset: 0;
