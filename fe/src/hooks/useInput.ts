import { useState } from 'react';

export type InputType<T> =
  | {
      initialValue: T;
    }
  | {
      initialValue: T;
      warningMessage: string;
      validator: (value: T) => boolean;
    };

export type InputReturnType<T> = {
  value: T;
  onChangeValue: (value: T) => void;
  isValidValue: boolean;
  warningMessage: string;
};

export const useInput = <T>(props: InputType<T>): InputReturnType<T> => {
  const [value, setValue] = useState(props.initialValue);

  if (!('validator' in props)) {
    return {
      value,
      onChangeValue: (value: T) => setValue(value),
      isValidValue: true,
      warningMessage: '',
    };
  }

  const isValidValue = props.validator(value);

  const onChangeValue = (value: T) => {
    setValue(value);
  };

  return {
    value,
    onChangeValue,
    isValidValue,
    warningMessage: isValidValue ? '' : props.warningMessage,
  };
};
