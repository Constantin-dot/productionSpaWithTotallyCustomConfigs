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
import { HStack } from '../Stack';
import { Text } from '../Text';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readonly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface IProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  label?: string;
  onChange?: (value: string | number) => void;
  readonly?: boolean;
  elipsis?: boolean;
  width?: string;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  size?: InputSize;
}

export const Input = memo((props: IProps) => {
  const {
    className,
    value = '',
    label,
    onChange,
    placeholder,
    autoFocus,
    type = 'text',
    readonly,
    elipsis,
    width = '100%',
    addonLeft,
    addonRight,
    size = 'm',
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

  const input = (
    <div className={classNames(cls.InputWrapper, mods, [className, cls[size]])}>
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

  if (!label) return input;

  return (
    <HStack max gap="8">
      <Text text={label} size="s" className={cls.label} />
      {input}
    </HStack>
  );
});
