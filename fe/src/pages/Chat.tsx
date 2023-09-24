import { ChatItem, SkeletonChatItem } from '@components/common/chat/ChatItem';
import { Title } from '@components/common/topBar/Title';
import { TopBar } from '@components/common/topBar/TopBar';
import { Theme, css } from '@emotion/react';
import { useChatRooms } from '@queries/chat';

export const Chat: React.FC = () => {
  const { chatRooms } = useChatRooms(); // TODO fcm연동 고려

  const renderSkeletons = (length: number) => {
    return Array.from({ length }).map((_, index) => (
      <SkeletonChatItem key={index} />
    ));
  };

  // TODO 최근 보내진 채팅순으로(알림이 왔을때) 재정렬

  return (
    <>
      <TopBar>
        <Title>채팅</Title>
      </TopBar>
      <div css={(theme) => pageStyle(theme)}>
        <ul>
          {chatRooms?.length === 0 && renderSkeletons(5)}
          {chatRooms?.map((chatItem) => (
            <ChatItem
              key={chatItem.chatroomId}
              opponent={chatItem.opponent}
              lastChatContent={chatItem.lastChatContent}
              lastChatTime={chatItem.lastChatTime}
              unreadChatCount={chatItem.unreadChatCount}
              thumbnailUrl={chatItem.product.imageUrl}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    flex: 1;
    padding-top: 56px;
    margin-bottom: 64px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: ${theme.color.neutral.background};

    &::-webkit-scrollbar {
      width: 10px;
      background-color: ${theme.color.neutral.background};
    }

    &::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }

    &::-webkit-scrollbar-thumb {
      width: 4px;
      border-radius: 10px;
      background-color: ${theme.color.neutral.border};
      border: 3px solid ${theme.color.neutral.background};
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  `;
};
