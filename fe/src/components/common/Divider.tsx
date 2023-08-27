import { FC } from 'react';
import { Theme, css } from '@emotion/react';

// 구분선

export const Divider: FC = () => {
  return <div css={(theme) => DividerStyle(theme)}></div>;
};

const DividerStyle = (theme: Theme) => {
  return css`
    width: 100%;
    height: 0.8px;
    background-color: ${theme.color.neutral.border};
  `;
};
