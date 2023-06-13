import {
  ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames, ModsType } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

export enum InputVariantEnum {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  ERROR = 'error',
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readonly'>;

interface IProps extends HTMLInputProps {
  className?: string;
  variant?: InputVariantEnum,
  value?: string | number;
  onChange?: (value: string | number) => void;
  readonly?: boolean;
  elipsis?: boolean;
  width?: string;
}

export const Input = memo((props: IProps) => {
  const {
    className,
    variant = InputVariantEnum.PRIMARY,
    value = '',
    onChange,
    placeholder,
    autoFocus,
    type = 'text',
    readonly,
    elipsis,
    width = '100%',
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autoFocus]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setInnerValue(e.target.value);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const mods: ModsType = {
    [cls.readonly]: readonly,
  };

  const subElemsMods: ModsType = {
    [cls.elipsis]: elipsis,
    [cls[variant]]: true,
  };

  return (
    <div className={classNames(cls.InputWrapper, mods, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>
          {`${placeholder}>`}
        </div>
      )}
      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={innerValue}
          onChange={onChangeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          className={classNames(cls.input, subElemsMods, [])}
          readOnly={readonly}
          width={width}
          {...otherProps}
        />
        {
          (isFocused && (innerValue?.toString()?.length === 0))
        && <span className={classNames(cls.caret, subElemsMods, [])} />
        }
      </div>
    </div>
  );
});
