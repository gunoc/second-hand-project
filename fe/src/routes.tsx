import { css } from '@emotion/react';
import { ChatRoom } from '@pages/ChatRoom';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PATH } from './constants/path';
import { useAuth } from './hooks/useAuth';
import { Layout } from './layout/Layout';
import { Account } from './pages/Account';
import { Chat } from './pages/Chat';
import { Home } from './pages/Home';
import { Interests } from './pages/Interests';
import { NotFound } from './pages/NotFound';
import { OauthLoading } from './pages/OauthLoading';
import { ProductDetail } from './pages/ProductDetail';
import { ProductEditor } from './pages/ProductEditor';
import { Sales } from './pages/Sales';
import { Signup } from './pages/Signup';
import { useTokenRefresh } from './queries/auth';


export const AppRoutes: React.FC = () => {
  useTokenRefresh();

  return (
    <div css={globalStyle} id="app-layout">
      <Routes>
        <Route element={<Layout />}>
          <Route element={<OnlyLoginUserRoute />}>
            <Route path={PATH.sales} element={<Sales />} />
            <Route path={PATH.interests} element={<Interests />} />
            <Route path={PATH.chat} element={<Chat />} />
            <Route path={PATH.newProduct} element={<ProductEditor />} />
            <Route path={PATH.editProduct} element={<ProductEditor />} />
            <Route path={`${PATH.chatRoom}/:id`} element={<ChatRoom />} />
          </Route>

          <Route element={<OnlyNotLoginUserRoute />}>
            <Route path={PATH.redirect} element={<OauthLoading />} />
            <Route path={PATH.signup} element={<Signup />} />
          </Route>

          <Route path={PATH.home} element={<Home />} />
          <Route path={PATH.account} element={<Account />} />
          <Route path={PATH.notFound} element={<NotFound />} />
          <Route path={`${PATH.detail}/:id`} element={<ProductDetail />} />
        </Route>

      </Routes>
    </div>
  );
};

const OnlyLoginUserRoute: React.FC = () => {
  const { isLogin } = useAuth();

  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to={PATH.invalidAccess} replace={true} />
  );
};

const OnlyNotLoginUserRoute: React.FC = () => {
  const { isLogin } = useAuth();

  return isLogin ? (
    <Navigate to={PATH.invalidAccess} replace={true} />
  ) : (
    <Outlet />
  );
};

const globalStyle = css`
  display: flex;
  flex-direction: column;
  width: 393px;
  height: 100vh;
  margin: auto;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
