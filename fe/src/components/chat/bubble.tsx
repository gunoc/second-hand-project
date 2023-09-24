import { Theme, css } from '@emotion/react';

type Props = {
  message: string;
  isMine: boolean;
  // isRead: boolean;
  isLast?: boolean;
};

export const Bubble: React.FC<Props> = ({ message, isMine }) => {
  const isRead = false;
  return (
    <div css={(theme) => bubbleStyle(theme, isMine)}>
      <div className="bubble">{message}</div>
      {!isRead && isMine && <div className="read-count">1</div>}
    </div>
  );
};

const bubbleStyle = (theme: Theme, isMine: boolean) => {
  return css`
    display: flex;
    gap: 8px;
    align-items: center;

    flex-direction: ${isMine ? 'row-reverse' : 'row'};

    .bubble {
      display: inline-flex;
      max-width: 256px;
      white-space: pre-wrap;
      padding: 8px 16px;
      justify-content: flex-end;
      align-items: center;
      border-radius: 16px;
      background-color: ${isMine
        ? theme.color.accent.backgroundPrimary
        : theme.color.neutral.backgroundBold};

      font: ${theme.font.displayDefault16};
      color: ${isMine
        ? theme.color.accent.text
        : theme.color.neutral.textStrong};
    }

    .read-count {
      font: ${theme.font.displayDefault12};
      color: ${theme.color.neutral.textWeak};
    }
  `;
};
