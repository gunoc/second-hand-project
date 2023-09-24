import { Theme, css } from '@emotion/react';
import React, { useEffect, useMemo, useRef } from 'react';

type Props = {
  onChange: (value: string) => void;
  minRows?: number;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>;

export const TextArea: React.FC<Props> = ({
  onChange,
  minRows = 1,
  ...rest
}) => {
  const minHeight = useMemo(() => minRows * 24, [minRows]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.max(textarea.scrollHeight, minHeight)}px`;
  }, [rest.value, minHeight]);

  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    onChange(value);
  };

  return (
    <textarea
      css={(theme) => textAreaStyle(theme)}
      {...rest}
      ref={textareaRef}
      onChange={onChangeTextarea}
    />
  );
};

const textAreaStyle = (theme: Theme) => css`
  width: 100%;
  font: ${theme.font.availableDefault16};
  caret-color: ${theme.color.accent.backgroundSecondary};

  &:focus {
    outline: 1px auto;
  }

  &::placeholder {
    color: ${theme.color.neutral.textWeak};
  }
`;
