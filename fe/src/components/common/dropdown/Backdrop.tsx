import { css, Theme } from '@emotion/react';

type Props = {
  onClick?: (e: React.MouseEvent) => void;
};

export const Backdrop: React.FC<Props> = ({ onClick }) => {
  return <div css={(theme) => backdropStyle(theme)} onClick={onClick}></div>;
};

const backdropStyle = (theme: Theme) => css`
  position: fixed;
  z-index: 100;
  inset: 0;
  width: 393px;
  height: 100vh;
  background-color: ${theme.color.neutral.overlay};
`;
