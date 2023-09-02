import { Title } from '@/components/common/topBar/Title';
import { TopBar } from '@/components/common/topBar/TopBar';
import { css } from '@emotion/react';

export const Chat: React.FC = () => {
  return (
    <>
      <TopBar>
        <Title>채팅</Title>
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
