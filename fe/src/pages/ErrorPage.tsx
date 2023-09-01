import { Theme, css } from '@emotion/react';

type Props = {
  message: any;
};

export const ErrorPage: React.FC<Props> = ({ message }) => {
  return (
    <div css={pageStyle}>
      error...: {message}
      {`༼ つ ◕_◕ ༽つ`}
    </div>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    width: 100%;
    height: 100%;
  `;
};
