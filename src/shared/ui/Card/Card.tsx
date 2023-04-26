import { FC, HTMLAttributes, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardVariantEnum {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface IProps extends HTMLAttributes<HTMLDivElement> {
  className?: string,
  children: ReactNode,
  variant?: CardVariantEnum,
}

export const Card: FC<IProps> = (props) => {
  const {
    className,
    children,
    variant = CardVariantEnum.NORMAL,
    ...otherProps
  } = props;

  return (
    <div className={classNames(cls.Card, {}, [className, cls[variant]])} {...otherProps}>
      {children}
    </div>
  );
};
