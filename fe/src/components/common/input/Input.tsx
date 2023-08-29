import { ReactComponent as CircleXFilled } from '@assets/circle-x-filled.svg';
import { Theme, css } from '@emotion/react';
import { InputHTMLAttributes } from 'react';
import { Button } from '../button/Button';

type Props = {
  variant: 'filled' | 'outlined' | 'ghost';
  radius?: 's' | 'l';
  label?: string;
  warningMessage?: string;
  onChange?: (value: string) => void;
  onPressEnter?: () => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const Input: React.FC<Props> = ({
  variant,
  radius,
  label,
  warningMessage,
  onChange,
  onPressEnter,
  ...props
}) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnter?.();
    }
  };

  const onDeleteClick = () => {
    onChange?.('');
  };

  return (
    <div css={(theme) => inputStyle(theme, variant, radius)}>
      <div className="input__content">
        {label && <span>{label}</span>}
        <input {...props} onChange={onInputChange} onKeyDown={onInputKeyDown} />
        {props.value && (
          <Button variant="text" onClick={onDeleteClick}>
            <CircleXFilled className='circle-x-filled'/>
          </Button>
        )}
      </div>
      {warningMessage && (
        <div className="warning__message">{warningMessage}</div>
      )}
    </div>
  );
};

const inputStyle = (
  theme: Theme,
  variant: 'filled' | 'outlined' | 'ghost',
  radius?: 's' | 'l',
) => {
  const VARIANT = {
    filled: {
      padding: '8px',
      border: 'none',
      background: theme.color.neutral.backgroundBold,
    },
    outlined: {
      padding: '4px 12px',
      border: `1px solid ${theme.color.neutral.border}`,
      background: theme.color.neutral.background,
    },
    ghost: {
      border: 'none',
    },
  };

  const RADIUS = {
    s: {
      borderRadius: '8px',
    },
    l: {
      borderRadius: '18px',
    },
    none: {
      borderRadius: '0',
    },
  };

  return css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 16px;
    font: ${theme.font.displayStrong16};
    color: ${theme.color.neutral.textStrong};

    & .input__content {
      display: flex;
      align-items: center;
      gap: 4px;

      ${VARIANT[variant]}
      ${RADIUS[radius ?? 'none']}
    }

    & input {
      flex: 1;
      display: flex;
      font: ${theme.font.availableDefault16};
      caret-color: ${theme.color.accent.backgroundSecondary};
      border: none;
      background: none;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: ${theme.color.neutral.textWeak};
      }
    }

    & .warning__message {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 16px;
      padding: 0 4px;
      font: ${theme.font.enabledStrong12};
      color: ${theme.color.system.warning};
    }

    & .circle-x-filled {
      fill: ${theme.color.neutral.textStrong};
    }
  `;
};