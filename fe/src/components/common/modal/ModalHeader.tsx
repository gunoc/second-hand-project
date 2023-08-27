import { FC } from 'react';
import { css } from '@emotion/react';

type Props = {
  children: React.ReactNode;
};

export const ModalHeader: FC<Props> = ({ children }) => {
  return <div css={ModalHeaderStyle}>{children}</div>;
};

const ModalHeaderStyle = css`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  padding: 12px 12px 16px 24px;
`;
