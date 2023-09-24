import { css, Theme } from '@emotion/react';

type Props = {
  count: number;
  size?: 's' | 'l';
} & React.HTMLAttributes<HTMLDivElement>;

export const CountBadge: React.FC<Props> = ({ count, size = 'l' }) => {
  return (
    <div css={(theme) => countBadgeStyle(theme, size)}>
      <span>{count}</span>
    </div>
  );
};

const countBadgeStyle = (theme: Theme, size: 's' | 'l') => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size === 's' ? '16px' : '24px'};
  height: ${size === 's' ? '16px' : '24px'};
  font: ${theme.font.displayDefault12};
  color: ${theme.color.neutral.background};
  background-color: ${theme.color.accent.backgroundPrimary};
  border-radius: 50%;
`;
