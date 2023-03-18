import { ChangeEvent, memo, useMemo } from 'react';
import { classNames, ModsType } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface ISelectOption {
  value: string,
  content: string,
}

type PropsType = {
  className?: string,
  label?: string,
  options?: Array<ISelectOption>,
  value?: string,
  onChange?: (value: string) => void,
  readonly?: boolean,
};

export const Select = memo((props: PropsType) => {
  const {
    className,
    label,
    options,
    value,
    onChange,
    readonly,
  } = props;

  const mods: ModsType = {
    [cls.readonly]: readonly,
  };

  const optionsList = useMemo(() => options?.map((opt) => (
    <option
      key={opt.value}
      value={opt.value}
      className={cls.option}
    >
      {opt.content}
    </option>
  )), [options]);

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={classNames(cls.Wrapper, {}, [className])}>
      {label && <span className={classNames(cls.label, mods, [className])}>{`${label}>`}</span>}
      <select
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionsList}
      </select>
    </div>
  );
});
