import { Theme, css } from '@emotion/react';
import { Message } from '@components/common/icons';
import { CountBadge } from '../countBadge/CountBadge';

export const NotiCount: React.FC = () => {
  // TOOD count 받아오기
  return (
    <div css={notiCountStyle}>
      <CountBadge size="s" count={1} className="count-box" />
      <Message />
    </div>
  );
};

const notiCountStyle = (theme: Theme) => {
  return css`
    position: relative;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid ${theme.color.neutral.border};

    .count-box {
      position: absolute;

      top: -20px;
      right: 0px;
    }
  `;
};
