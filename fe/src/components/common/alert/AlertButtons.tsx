import { css } from '@emotion/react';
import { FC } from 'react';
type Props = {
  children: React.ReactNode;
};

export const AlertButtons: FC<Props> = ({ children }) => {
  return <div css={AlertButtonsStyle}>{children}</div>;
};

const AlertButtonsStyle = css`
  display: flex;
  padding: 24px 32px;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;
