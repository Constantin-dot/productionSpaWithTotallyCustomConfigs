import { FC, HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type TCardVariant = 'normal' | 'light' | 'outlined';
export type TCardPadding = '0' | '8' | '16' | '24';
export type TCardBorder = 'round' | 'normalB';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: TCardVariant;
  max?: boolean;
  padding?: TCardPadding;
  border?: TCardBorder;
}

const mapPaddingToClass: Record<TCardPadding, string> = {
  0: 'gap_0',
  8: 'gap_8',
  16: 'gap_16',
  24: 'gap_24',
};

export const Card: FC<IProps> = (props) => {
  const {
    className,
    children,
    variant = 'normal',
    max,
    padding = '8',
    border = 'normal',
    ...otherProps
  } = props;

  const paddingClass = mapPaddingToClass[padding];

  return (
    <div
      className={classNames(cls.Card, { [cls.max]: max }, [
        className,
        cls[variant],
        cls[paddingClass],
        cls[border],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  );
};
