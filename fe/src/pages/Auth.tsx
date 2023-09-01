import { ReactComponent as UserCircle } from '@/assets/user-circle.svg';
import { Button } from '@/components/common/button/Button';
import { Title } from '@/components/common/topBar/Title';
import { TopBar } from '@/components/common/topBar/TopBar';
import { PATH } from '@/constants/path';
import {
  clearTokens,
  clearUserInfo,
  getTokens,
  getUserInfo,
} from '@/utils/localStorage';
import kakaoLogin from '@assets/kakao_login.png';
import { Theme, css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const tokens = getTokens();

  const isLogin = userInfo !== null && tokens !== null;

  const onClickLogin = () => {
    navigate(PATH.redirect);
  };

  const onClickLogout = () => {
    // TODO: 로그아웃 API 호출
    clearUserInfo();
    clearTokens();
    navigate(PATH.auth, { replace: true });
  };

  return (
    <>
      <TopBar>
        <Title>내 계정</Title>
      </TopBar>
      <div css={(theme) => pageStyle(theme)}>
        {isLogin ? (
          <>
            <div className="auth__info">
              <div className="user__profile">
                {userInfo.imageUrl ? (
                  <img src={userInfo.imageUrl} alt="프로필 사진" />
                ) : (
                  <UserCircle />
                )}
              </div>
              <div className="user__name">{userInfo.nickname}</div>
            </div>
            <div className="button__wrapper">
              <Button
                variant="rectangle"
                state="active"
                onClick={onClickLogout}
              >
                로그아웃
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="auth__info">로그인이 필요합니다.</div>
            <div className="button__wrapper">
              <Button variant="text" onClick={onClickLogin}>
                <img src={kakaoLogin} alt="카카오 소셜 로그인" />
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    font: ${theme.font.displayStrong16};
    color: ${theme.color.neutral.textStrong};
    gap: 24px;

    .auth__info {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 180px;
      gap: 16px;
    }

    .user__profile {
      display: flex;
      justify-content: center;

      & svg {
        width: 100px;
        height: 100px;
        stroke: ${theme.color.neutral.text};
      }
    }

    .user__name {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .button__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
};
