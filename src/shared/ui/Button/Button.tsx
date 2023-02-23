import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonVariantEnum {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    INVERTED_BACKGROUND = 'invertedBackground'
}

export enum ButtonSizeEnum {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l'
}

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    isSquare?: boolean,
    size?: ButtonSizeEnum,
    variant?: ButtonVariantEnum,
}

export const Button: FC<IProps> = (props) => {
  const {
    className,
    variant,
    isSquare = false,
    size = ButtonSizeEnum.S,
    children,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [cls.square]: isSquare,
    [cls[size]]: true,
  };

  return (
    <button
      type="button"
      className={classNames(cls.Button, mods, [className, cls[variant]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
