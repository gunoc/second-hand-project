import { Theme, css } from '@emotion/react';

type Props = {
  icon: string;
  label: string;
  selectedCategory: boolean;
  onSelectCategory: () => void;
};

export const Option: React.FC<Props> = ({
  icon,
  label,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div
      css={(theme) => optionStyle(theme, icon, selectedCategory)}
      onClick={onSelectCategory}
    >
      <img src={icon} alt={label} />
      <span>{label}</span>
    </div>
  );
};

const optionStyle = (
  theme: Theme,
  icon: string,
  selectedCategory?: boolean,
) => {
  return css`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 80px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background-color: ${icon ? '' : theme.color.neutral.backgroundBold};
    }
    span {
      font: ${selectedCategory
        ? theme.font.enabledStrong12
        : theme.font.displayDefault12};
      color: ${theme.color.neutral.text};
    }
  `;
};
