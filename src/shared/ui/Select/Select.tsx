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
};

export const Select = memo((props: PropsType) => {
  const {
    className,
    label,
    options,
    value,
    onChange,
  } = props;
  const mods: ModsType = {

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
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <select
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
});
