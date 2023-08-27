import { css, Theme } from '@emotion/react';
import { FC } from 'react';

type Props = {
  onClick?: () => void;
};

export const Backdrop: FC<Props> = ({ onClick }) => {
  return <div css={backdropStyle} onClick={onClick}></div>;
};

const backdropStyle = (theme: Theme) => css`
  position: fixed;
  inset: 0;
  background-color: ${theme.color.neutral.overlay};
`;
