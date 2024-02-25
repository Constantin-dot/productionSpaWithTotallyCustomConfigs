import { memo, useCallback } from 'react';
import { ListBox as DeprecatedListBox } from '@/shared/ui/deprecated/Popups';
import { CurrencyEnum } from '../../model/types/currency';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

type PropsType = {
  className?: string;
  label: string;
  readonly?: boolean;
  value?: CurrencyEnum;
  onChange?: (value: CurrencyEnum) => void;
};

const options = [
  { value: CurrencyEnum.RUB, content: CurrencyEnum.RUB },
  { value: CurrencyEnum.EUR, content: CurrencyEnum.EUR },
  { value: CurrencyEnum.USD, content: CurrencyEnum.USD },
];

export const CurrencySelect = memo((props: PropsType) => {
  const { className, label, readonly, value, onChange } = props;

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as CurrencyEnum);
    },
    [onChange],
  );

  const listBoxProps = {
    items: options,
    value,
    defaultValue: 'Select a value',
    onChange: onChangeHandler,
    className,
    readonly,
    label,
    direction: 'topRight' as const,
  };

  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={<ListBox {...listBoxProps} />}
      off={<DeprecatedListBox {...listBoxProps} />}
    />
  );
});
