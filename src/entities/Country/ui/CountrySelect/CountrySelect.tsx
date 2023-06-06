import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/Popups';
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
