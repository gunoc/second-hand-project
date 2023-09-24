import { NavBar } from '@components/common/navBar/NavBar';
import { css } from '@emotion/react';
import { useAnimation } from '@hooks/useAnimation';
import { useLayoutStore } from '@stores/layoutStore';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  const { shouldSlideLeft } = useLayoutStore();
  const { handleTransitionEnd, animationTrigger } =
    useAnimation(shouldSlideLeft);

  return (
    <div
      css={() => layoutStyle(animationTrigger)}
      onTransitionEnd={handleTransitionEnd}
    >
      <Outlet />
      <NavBar />
      <div id="dropdown-root"></div>
    </div>
  );
};

const layoutStyle = (animationTrigger: boolean) => {
  return css`
    height: 100vh;
    display: flex;
    flex-direction: column;
    transition: 300ms ease;
    transform: translateX(${animationTrigger ? '-393px' : '0px'});
  `;
};
//min-height: 100vh;
