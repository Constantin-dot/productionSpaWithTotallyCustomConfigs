import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, ModsType } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonVariantEnum {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
  OUTLIN_INVERTED = 'outlineInverted',
  BACKGROUND = 'background',
  INVERTED_BACKGROUND = 'invertedBackground',
}

export enum ButtonSizeEnum {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isSquare?: boolean;
  size?: ButtonSizeEnum;
  variant?: ButtonVariantEnum;
  disabled?: boolean;
  children?: ReactNode;
}

export const Button = memo((props: IProps) => {
  const {
    className,
    variant = ButtonVariantEnum.OUTLINE,
    disabled,
    isSquare = false,
    size = ButtonSizeEnum.S,
    children,
    ...otherProps
  } = props;

  const mods: ModsType = {
    [cls.square]: isSquare,
    [cls[size]]: true,
    [cls.disabled]: disabled,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(cls.Button, mods, [className, cls[variant]])}
      {...otherProps}
    >
      {children}
    </button>
  );
});
