import { css } from '@emotion/react';

type Props = {
  message: React.ReactNode;
};

export const ErrorPage: React.FC<Props> = ({ message }) => {
  return (
    <div css={pageStyle}>
      error...: {message}
      {`༼ つ ◕_◕ ༽つ`}
    </div>
  );
};

const pageStyle = () => {
  return css`
    width: 100%;
    height: 100%;
  `;
};
