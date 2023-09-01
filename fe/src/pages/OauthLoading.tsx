import { PATH } from '@/constants/path';
import kakao from '@assets/kakao.png';
import { Theme, css } from '@emotion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const OauthLoading: React.FC = () => {
  // 동작 흐름
  // 카카오 인가 코드로 로그인 api 호출
  // 사용자 정보가 오면 로그인 -> 홈으로 이동
  // 사용자 정보가 없으면 -> 회원가입 페이지로 이동
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(PATH.signup, { replace: true });
    }, 2000);
  }, [navigate]);

  return (
    <>
      <div css={(theme) => pageStyle(theme)}>
        <img src={kakao} alt="" />
        <div className="loading-message">카카오 로그인 중...</div>
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
    justify-content: center;
    gap: 40px;
    font: ${theme.font.displayStrong20};
    font-size: 32px;
    color: ${theme.color.neutral.textStrong};

    & > img {
      width: 100px;
      height: 100px;
    }

    .loading-message {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
};
