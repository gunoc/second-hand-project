import { Theme, css } from '@emotion/react';

export const LoadingPage: React.FC = () => {
  return (
    // TODO 스켈레톤 ui 라이브러리 찾아보기
    <div css={pageStyle}>
      Loading...
      {`( •̀ ω •́ )✧`}
    </div>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    width: 100%;
    height: 100%;
  `;
};
