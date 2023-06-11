import {
  ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames, ModsType } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readonly'>;

interface IProps extends HTMLInputProps {
  wrapperClassName?: string;
  inputClassName?: string;
  caretClassName?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  readonly?: boolean;
  elipsis?: boolean;
  width?: string;
}

export const Input = memo((props: IProps) => {
  const {
    wrapperClassName,
    inputClassName,
    caretClassName,
    value,
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
  const [innerValue, setInnerValue] = useState('');

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

  return (
    <div className={classNames(cls.InputWrapper, mods, [wrapperClassName])}>
      {placeholder && (
        <div className={cls.placeholder}>
          {`${placeholder}>`}
        </div>
      )}
      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          className={classNames(cls.input, { [cls.elipsis]: elipsis }, [inputClassName])}
          readOnly={readonly}
          width={width}
          {...otherProps}
        />
        {
          (isFocused && (innerValue.length === 0) && (value?.toString()?.length === 0))
        && <span className={classNames(cls.caret, { [cls.elipsis]: elipsis }, [caretClassName])} />
        }
      </div>
    </div>
  );
});
