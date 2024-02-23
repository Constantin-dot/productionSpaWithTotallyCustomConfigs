import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, ModsType } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type TButtonVariant = 'clear' | 'outline' | 'filled';

export type TButtonSize = 's' | 'm' | 'l';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isSquare?: boolean;
  size?: TButtonSize;
  variant?: TButtonVariant;
  disabled?: boolean;
  children?: ReactNode;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button = memo((props: IProps) => {
  const {
    className,
    variant = 'outline',
    disabled,
    isSquare = false,
    size = 's',
    children,
    addonLeft,
    addonRight,
    ...otherProps
  } = props;

  const mods: ModsType = {
    [cls.square]: isSquare,
    [cls.disabled]: disabled,
    [cls.withAddon]: Boolean(addonLeft || addonRight),
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(cls.Button, mods, [
        className,
        cls[variant],
        cls[size],
      ])}
      {...otherProps}
    >
      <div className={cls.addonLeft}>{addonLeft}</div>
      {children}
      <div className={cls.addonRight}>{addonRight}</div>
    </button>
  );
});
