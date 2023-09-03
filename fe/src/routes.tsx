import { css } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import { PATH } from './constants/path';
import { Layout } from './layout/Layout';
import { Auth } from './pages/Auth';
import { Chat } from './pages/Chat';
import { Home } from './pages/Home';
import { Interests } from './pages/Interests';
import { NotFound } from './pages/NotFound';
import { OauthLoading } from './pages/OauthLoading';
import { Sales } from './pages/Sales';
import { Signup } from './pages/Signup';

// TODO Private routes 구현
export const AppRoutes: React.FC = () => {
  return (
    <div css={globalStyle} id="app-layout">
      <Routes>
        {/* TODO: 하단바 X - 카테고리 페이지 */}
        {/* TODO: 하단바 X - 회원가입 페이지(리다이렉트) */}
        {/* TODO: 하단바 O - 등록페이지 / 인증 필요 */}
        {/* TODO: 하단바 O - 상세페이지 / 인증 필요*/}
        {/* TODO: 하단바 O - 채팅페이지 / 인증 필요 */}
        <Route element={<Layout />}>
          <Route path={PATH.notFound} element={<NotFound />} />
          <Route>
            <Route path={PATH.home} element={<Home />} />
            <Route path={PATH.sales} element={<Sales />} />
            {/* 인증필요 */}
            <Route path={PATH.interests} element={<Interests />} />
            {/* 인증필요 */}
            <Route path={PATH.chat} element={<Chat />} />
            <Route path={PATH.auth} element={<Auth />} />
          </Route>
        </Route>
        <Route path={PATH.redirect} element={<OauthLoading />} />
        <Route path={PATH.signup} element={<Signup />} />
      </Routes>
    </div>
  );
};

const globalStyle = css`
  display: flex;
  flex-direction: column;
  width: 393px;
  height: 852px;
  margin: auto;
  border: 1px solid black;

  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
