import { css } from '@emotion/react';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  width?: string;
  height?: string;
  flexDirection?: 'row' | 'column';
  gap?: string;
  buttonColor?: string;
  hasBorder?: boolean;
  borderColor?: string;
  borderRadius?: string;
  fontColor?: string;
  fontSize?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonReusable: React.FC<ButtonProps> = ({
  width = 'auto',
  height = 'auto',
  flexDirection = 'row',
  gap = '0',
  buttonColor = 'transparent',
  hasBorder = false,
  borderColor = 'black',
  borderRadius = '0',
  fontColor = 'black',
  fontSize = '16px',
  ...props
}) => {
  return (
    <button
      css={ButtonStyle({
        width,
        height,
        flexDirection,
        gap,
        buttonColor,
        hasBorder,
        borderColor,
        borderRadius,
        fontColor,
        fontSize,
      })}
      {...props}
    >
      {props.children}
    </button>
  );
};

type StyleProps = {
  width: string;
  height: string;
  flexDirection: 'row' | 'column';
  gap: string;
  buttonColor: string;
  hasBorder: boolean;
  borderColor: string;
  borderRadius: string;
  fontColor: string;
  fontSize: string;
};

const ButtonStyle = ({
  width,
  height,
  flexDirection,
  gap,
  buttonColor,
  hasBorder,
  borderColor,
  borderRadius,
  fontColor,
  fontSize,
}: StyleProps) => {
  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${width};
    height: ${height};
    flex-direction: ${flexDirection};
    gap: ${gap};
    background-color: ${buttonColor};
    color: ${fontColor};
    font-size: ${fontSize};
    border: ${hasBorder ? `1px solid ${borderColor}` : 'none'};
    border-radius: ${borderRadius};

    &:hover,
    &:active {
      opacity: 0.8;
    }
  `;
};
