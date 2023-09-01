import { Theme, css } from '@emotion/react';

export const Category: React.FC = () => {
  // TODO 메인에서 미리 데이터가 받아와져 있어야함
  return <div css={pageStyle}>카테고리~</div>;
};

const pageStyle = (theme: Theme) => {
  return css`
    flex: 1;
  `;
};
