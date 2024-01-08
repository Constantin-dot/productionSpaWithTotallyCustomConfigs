import { memo, ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type TAppLinkVariant = 'primary' | 'red';

interface IAppLinkProps extends LinkProps {
  className?: string;
  variant?: TAppLinkVariant;
  children?: ReactNode;
  activeClassName?: string;
}

export const AppLink = memo((props: IAppLinkProps) => {
  const {
    className,
    variant = 'primary',
    activeClassName = '',
    children,
    to,
    ...otherProps
  } = props;

  return (
    <NavLink
      to={to}
      className={
        ({ isActive }) =>
          classNames(cls.AppLink, { [activeClassName]: isActive }, [
            className,
            cls[variant],
          ])
        // eslint-disable-next-line react/jsx-curly-newline
      }
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});
