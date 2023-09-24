import { Theme, css } from '@emotion/react';

import { Dropdown } from '@components/common/dropdown/Dropdown';
import { ChevronLeft, Dots, Send } from '@components/common/icons';
import { MenuBox } from '@components/common/menu/MenuBox';
import { MenuItem } from '@components/common/menu/MenuItem';
import { LeftButton } from '@components/common/topBar/LeftButton';
import { RightButton } from '@components/common/topBar/RightButton';
import { TopBar } from '@components/common/topBar/TopBar';
import { Button } from '@components/common/button/Button';
import { Title } from '@components/common/topBar/Title';
import { ChatBar } from '@components/common/actionBar/ChatBar';
import { Input } from '@components/common/input/Input';
import { ImageBox } from '@components/common/imageBox/ImageBox';
import { Bubble } from '@components/chat/bubble';

// TODO 그냥 공백이면 안보내져야함
export const ChatRoom: React.FC = () => {
  const receiver = '삼만보';
  const randomImageUrl = 'https://picsum.photos/200/300';

  return (
    <div css={(theme) => pageStyle(theme)}>
      <TopBar>
        <LeftButton>
          <Button
            variant="text"
            onClick={() => {
              console.log('onCloseChatRoom');
            }}
          >
            <ChevronLeft className="button__back" />
            닫기
          </Button>
        </LeftButton>
        <Title>{receiver}</Title>
        <RightButton>
          <Dropdown
            opener={
              <Button
                variant="text"
                className="button__topbar"
                onClick={() => {
                  console.log('topbar dropdown');
                }}
              >
                <Dots />
              </Button>
            }
            menu={
              <MenuBox>
                <MenuItem
                  onClick={() => {
                    console.log('알람 끄기');
                  }}
                >
                  알람 끄기
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    console.log('신고하기');
                  }}
                >
                  신고하기
                </MenuItem>
                <MenuItem
                  variant="warning"
                  onClick={() => {
                    console.log(' 채팅방 나가기');
                  }}
                >
                  채팅방 나가기
                </MenuItem>
              </MenuBox>
            }
          />
        </RightButton>
      </TopBar>
      <div
        className="info-banner"
        onClick={() => {
          console.log('상세페이지로 이동');
        }}
      >
        <ImageBox size="s" imageUrl={randomImageUrl} />
        <div className="info-banner-body">
          <p className="info-banner-body__title">빈티지 롤러 스케이트</p>
          <p className="info-banner-body__price">169,000원</p>
        </div>
      </div>
      <div className="chat-body">
        <Bubble isMine={false} message="안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={false} message="안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={false} message="안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={false} message="안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={false} message="안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={false} message="안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={false} message="안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={false} message="안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
        <Bubble isMine={true} message="네안녕하세요요요요요요요요" />
      </div>
      <ChatBar>
        <Input
          onChange={() => {}}
          onPressEnter={() => {}}
          placeholder="내용을 입력하세요"
          radius="l"
          variant="outlined"
        />
        <Button variant="fab" size="s">
          <Send />
        </Button>
      </ChatBar>
    </div>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    ::-webkit-scrollbar {
      display: none;
    }

    height: 100vh;
    overflow-y: auto;

    .button__back {
      stroke: ${theme.color.neutral.textStrong};
    }

    .button__topbar {
      stroke: ${theme.color.neutral.textStrong};
    }

    .info-banner {
      cursor: pointer;
      position: fixed;
      top: 56px;
      display: flex;
      width: 393px;
      align-items: center;
      gap: 8px;
      padding: 16px;
      border-bottom: 0.8px solid ${theme.color.neutral.border};
      background-color: ${theme.color.neutral.background};

      &-body {
        display: flex;
        width: 305px;
        flex-direction: column;
        align-items: flex-start;
        flex-shrink: 0;
        align-self: stretch;

        > p {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1 0 0;
          align-self: stretch;
          color: ${theme.color.neutral.textStrong};
        }
        &__title {
          font: ${theme.font.displayDefault16};
        }
        &__price {
          font: ${theme.font.displayStrong16};
        }
      }
    }

    .chat-body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      padding: 12px 16px;
      margin-top: 80px;
      margin-bottom: 64px;
    }
  `;
};
