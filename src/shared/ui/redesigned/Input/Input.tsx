import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames, ModsType } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readonly'
>;

interface IProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  readonly?: boolean;
  elipsis?: boolean;
  width?: string;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Input = memo((props: IProps) => {
  const {
    className,
    value = '',
    onChange,
    placeholder,
    autoFocus,
    type = 'text',
    readonly,
    elipsis,
    width = '100%',
    addonLeft,
    addonRight,
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autoFocus]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const mods: ModsType = {
    [cls.readonly]: readonly,
    [cls.focused]: isFocused,
    [cls.withAddonLeft]: Boolean(addonLeft),
    [cls.withAddonRight]: Boolean(addonRight),
  };

  const subElemsMods: ModsType = {
    [cls.elipsis]: elipsis,
  };

  return (
    <div className={classNames(cls.InputWrapper, mods, [className])}>
      <div className={cls.addonLeft}>{addonLeft}</div>
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChangeHandler}
        onFocus={onFocus}
        onBlur={onBlur}
        className={classNames(cls.input, subElemsMods, [])}
        readOnly={readonly}
        width={width}
        placeholder={placeholder}
        {...otherProps}
      />
      <div className={cls.addonRight}>{addonRight}</div>
    </div>
  );
});
