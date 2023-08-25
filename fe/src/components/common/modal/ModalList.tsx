import { css } from '@emotion/react';
import { FC } from 'react';

type Props = {
  children: React.ReactNode;
};

export const ModalList: FC<Props> = ({ children }) => {
  return <ul css={ModalListStyle}>{children}</ul>;
};

const ModalListStyle = css`
  display: flex;
  padding: 0px 24px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;
