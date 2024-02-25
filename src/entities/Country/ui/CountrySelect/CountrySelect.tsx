import { memo, useCallback } from 'react';
import { ListBox as DeprecatedListBox } from '@/shared/ui/deprecated/Popups';
import { CountryEnum } from '../../model/types/country';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

type PropsType = {
  className?: string;
  label: string;
  readonly?: boolean;
  value?: CountryEnum;
  onChange?: (value: CountryEnum) => void;
};

const options = [
  { value: CountryEnum.Russia, content: CountryEnum.Russia },
  { value: CountryEnum.Belarus, content: CountryEnum.Belarus },
  { value: CountryEnum.Armenia, content: CountryEnum.Armenia },
  { value: CountryEnum.Gorgia, content: CountryEnum.Gorgia },
  { value: CountryEnum.Kazakhstan, content: CountryEnum.Kazakhstan },
];

export const CountrySelect = memo((props: PropsType) => {
  const { className, label, readonly, value, onChange } = props;

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as CountryEnum);
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
