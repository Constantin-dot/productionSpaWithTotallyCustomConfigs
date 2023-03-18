import { memo, useCallback } from 'react';
import { Select } from 'shared/ui/Select/Select';
import { CountryEnum } from '../../model/types/country';

type PropsType = {
  className?: string,
  label: string,
  readonly?: boolean,
  value?: CountryEnum,
  onChange?: (value: CountryEnum) => void,
};

const options = [
  { value: CountryEnum.Russia, content: CountryEnum.Russia },
  { value: CountryEnum.Belarus, content: CountryEnum.Belarus },
  { value: CountryEnum.Armenia, content: CountryEnum.Armenia },
  { value: CountryEnum.Gorgia, content: CountryEnum.Gorgia },
  { value: CountryEnum.Kazakhstan, content: CountryEnum.Kazakhstan },
];

export const CountrySelect = memo((props: PropsType) => {
  const {
    className,
    label,
    readonly,
    value,
    onChange,
  } = props;

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as CountryEnum);
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
