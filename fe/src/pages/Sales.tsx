import { Title } from '@/components/common/topBar/Title';
import { TopBar } from '@/components/common/topBar/TopBar';
import { css } from '@emotion/react';

export const Sales: React.FC = () => {
  return (
    <>
      <TopBar>
        <Title>판매 내역</Title>
      </TopBar>
      <div css={() => pageStyle()}></div>
    </>
  );
};

const pageStyle = () => {
  return css`
    flex: 1;
  `;
};
