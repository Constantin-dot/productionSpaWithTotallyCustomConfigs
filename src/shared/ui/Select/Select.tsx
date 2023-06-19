import { ChangeEvent, useMemo } from 'react';
import { classNames, ModsType } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface ISelectOption<T extends string> {
  value: T,
  content: string,
}

type PropsType<T extends string> = {
  className?: string,
  label?: string | null,
  options?: ISelectOption<T>[],
  value?: T,
  onChange?: (value: T) => void,
  readonly?: boolean,
};

export const Select = <T extends string>(props: PropsType<T>) => {
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
    onChange?.(event.target.value as T);
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
};
