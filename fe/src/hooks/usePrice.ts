import { useEffect } from 'react';
import { useInput } from './useInput';

type PriceInputType = {
  initialPrice?: string;
};

type PriceInputReturnType = {
  price: string;
  isValidPrice: boolean;
  priceWarningMessage: string;
  onChangePrice: (price: string) => void;
};

export const usePrice = ({
  initialPrice,
}: PriceInputType): PriceInputReturnType => {
  const { value, onChangeValue, isValidValue, warningMessage } = useInput({
    initialValue: initialPrice ?? '',
    validator: (value: string) => /^[0-9,]*$/.test(value), // 숫자와 쉼표(,)만 입력 가능
    warningMessage: '숫자와 쉼표(,)만 입력 가능합니다.',
  });

  useEffect(() => {
    if (initialPrice === undefined) {
      return;
    }
    
    onChangeValue(initialPrice);
  }, [initialPrice]);

  // 숫자만으로 이루어졌는지 확인하는 함수
  const priceValidator = (price: string) => /^[0-9]*$/.test(price);

  const onChangePrice = (price: string) => {
    const priceWithoutComma = price.replace(/,/g, '');

    if (price.length === 0 || !priceValidator(priceWithoutComma)) {
      onChangeValue(price);
      return;
    }

    if (priceWithoutComma.length > 10) {
      return;
    }

    onChangeValue(Number(priceWithoutComma).toLocaleString());
  };

  return {
    price: value,
    isValidPrice: isValidValue,
    priceWarningMessage: warningMessage,
    onChangePrice,
  };
};
