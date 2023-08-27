import { FC } from 'react';
import { Theme, css } from '@emotion/react';

type Props = {
  isOpen: boolean;
};

export const Dim: FC<Props> = ({ isOpen }) => {
  return <>{isOpen && <div css={(theme) => DimStyle(theme)} />}</>;
};

const DimStyle = (theme: Theme) => {
  return css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 105;
    width: 393px;
    height: 852px;
    background-color: ${theme.color.neutral.overlay};
  `;
};
