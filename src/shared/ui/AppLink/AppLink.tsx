import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkVariantEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red',
}

interface IAppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariantEnum;
}

export const AppLink: FC<IAppLinkProps> = (props) => {
  const {
    className,
    variant = AppLinkVariantEnum.PRIMARY,
    children,
    to,
    ...otherProps
  } = props;

  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, {}, [className, cls[variant]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
};
