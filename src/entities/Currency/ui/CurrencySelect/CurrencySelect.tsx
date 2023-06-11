import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/Popups';
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
    <ListBox
      items={options}
      value={value}
      defaultValue="Select a value"
      onChange={onChangeHandler}
      className={className}
      readonly={readonly}
      label={label}
      direction="topRight"
    />
  );
});
