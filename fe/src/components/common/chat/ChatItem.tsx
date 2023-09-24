import { CountBadge } from '@components/common/countBadge/CountBadge';
import { ImageBox } from '@components/common/imageBox/ImageBox';
import { css, keyframes, Theme } from '@emotion/react';

export type ChatItemProps = {
  opponent: OpponentType;
  lastChatContent: string;
  lastChatTime: string;
  unreadChatCount: number;
  thumbnailUrl: string;
};

export const ChatItem: React.FC<ChatItemProps> = ({
  opponent,
  lastChatContent,
  lastChatTime,
  unreadChatCount,
  thumbnailUrl,
}) => {
  return (
    <li css={(theme) => chatItemStyle(theme)}>
      <ImageBox size="s" imageUrl={opponent.imageUrl} variant="circle" />
      <div className="info">
        <div className="info__title">
          <span className="info__title--nickname">{opponent.nickname}</span>
          <span className="info__title--time">
            {lastChatTime} {/* TODO n분전 util */}
          </span>
        </div>
        <div className="info__message">
          <p>{lastChatContent}</p>
        </div>
      </div>
      <div className="unread-messages">
        <CountBadge count={unreadChatCount} />
      </div>
      <ImageBox size="s" imageUrl={thumbnailUrl} />
    </li>
  );
};

const chatItemStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-bottom: 0.8px solid ${theme.color.neutral.border};

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__title {
      display: flex;
      align-items: center;
      gap: 4px;

      &--nickname {
        font: ${theme.font.displayStrong16};
        color: ${theme.color.neutral.textStrong};
      }

      &--time {
        font: ${theme.font.displayDefault12};
        color: ${theme.color.neutral.textWeak};
      }
    }

    &__message {
      font: ${theme.font.displayDefault12};
      color: ${theme.color.neutral.text};

      & > p {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  .unread-messages {
    align-self: stretch;
    display: flex;
    align-items: flex-start;
  }
`;

export const SkeletonChatItem: React.FC = () => {
  return (
    <li css={(theme) => skeletonChatItemStyle(theme)}>
      <ImageBox size="s" variant="circle" />
      <div className="info">
        <div className="info__title">
          <div className="info__title--nickname"></div>
          <div className="info__title--time"></div>
        </div>
        <div className="info__message"></div>
      </div>
      <div className="unread-messages">
        <CountBadge count={0} />
      </div>
      <ImageBox size="s" />
    </li>
  );
};

const skeletonChatItemStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-bottom: 0.8px solid ${theme.color.neutral.border};

  & > * {
    animation: ${fadeInOut} 1.5s ease-in-out 0.5s infinite;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__title {
      display: flex;
      align-items: center;
      gap: 4px;

      &--nickname {
        width: 50px;
        height: 24px;
        border-radius: 4px;
        background-color: ${theme.color.neutral.backgroundBold};
      }

      &--time {
        width: 70px;
        height: 24px;
        border-radius: 4px;
        background-color: ${theme.color.neutral.backgroundBold};
      }
    }

    &__message {
      height: 16px;
      background-color: ${theme.color.neutral.backgroundBold};
    }
  }

  .unread-messages {
    align-self: stretch;
    display: flex;
    align-items: flex-start;
  }
`;

const fadeInOut = keyframes`
0% {
  opacity: 1;
}
50% {
  opacity: 0.4;
}
100% {
  opacity: 1;
}
`;
