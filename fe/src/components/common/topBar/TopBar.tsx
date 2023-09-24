import { Theme, css } from '@emotion/react';

type Props = {
  children: React.ReactNode;
  transparent?: boolean;
};

export const TopBar: React.FC<Props> = ({ children, transparent }) => {
  return (
    <header css={(theme) => topBarStyle(theme, transparent)}>{children}</header>
  );
};

//fill: ${theme.color.accent.text};
const topBarStyle = (theme: Theme, transparent?: boolean) => {
  const transparentStyle = css`
    & > * {
      color: ${theme.color.accent.text};
      stroke: ${theme.color.accent.text};
    }
  `;

  const notTransparentStyle = css`
    border-bottom: 0.8px solid ${theme.color.neutral.border};
    background: ${theme.color.neutral.backgroundBlur};
  `;

  return css`
    position: fixed;
    top: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    width: 393px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0px;
    backdrop-filter: ${transparent ? 'none' : 'blur(4px)'};
    z-index: 100;

    ${transparent ? transparentStyle : notTransparentStyle}

    & .control-btn {
      padding: 0px 8px;
    }
  `;
};
