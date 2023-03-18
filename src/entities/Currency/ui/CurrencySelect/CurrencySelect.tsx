import { memo, useCallback } from 'react';
import { Select } from 'shared/ui/Select/Select';
import { CurrencyEnum } from '../../model/types/currency';

type PropsType = {
  className?: string,
  label: string,
  readonly?: boolean,
  value?: CurrencyEnum,
  onChange?: (value: CurrencyEnum) => void,
};

const options = [
  { value: CurrencyEnum.RUB, content: CurrencyEnum.RUB },
  { value: CurrencyEnum.EUR, content: CurrencyEnum.EUR },
  { value: CurrencyEnum.USD, content: CurrencyEnum.USD },
];

export const CurrencySelect = memo((props: PropsType) => {
  const {
    className,
    label,
    readonly,
    value,
    onChange,
  } = props;

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as CurrencyEnum);
  }, [onChange]);

  return (
    <Select
      className={className}
      label={label}
      options={options}
      readonly={readonly}
      value={value}
      onChange={onChangeHandler}
    />
  );
});
