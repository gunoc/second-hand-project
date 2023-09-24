import { Theme, css } from '@emotion/react';

type Props = {
  state: ProductStatusType;
};

export const StatusBadge: React.FC<Props> = ({ state }) => {
  return <div css={(theme) => statusBadgeStyle(theme, state)}>{state}</div>;
};

const statusBadgeStyle = (theme: Theme, state: ProductStatusType) => {
  const STATE_STYLES = {
    예약중: theme.color.brand.primaryStrong,
    판매중: theme.color.accent.backgroundSecondary,
    판매완료: theme.color.neutral.border,
  };

  return css`
    display: flex;
    height: 22px;
    padding: 0 8px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;

    background-color: ${STATE_STYLES[state]};
    font: ${theme.font.displayDefault12};
    color: ${theme.color.accent.text};
  `;
};
