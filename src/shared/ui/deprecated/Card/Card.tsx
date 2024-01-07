import { FC, HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardVariantEnum {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
  OUTLINED_INVERTED = 'outlined_inverted',
}

interface IProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariantEnum;
  max?: boolean;
}

export const Card: FC<IProps> = (props) => {
  const {
    className,
    children,
    variant = CardVariantEnum.NORMAL,
    max,
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(cls.Card, { [cls.max]: max }, [
        className,
        cls[variant],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  );
};
