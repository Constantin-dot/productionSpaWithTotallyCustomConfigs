import { memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Page.module.scss';

type PropsType = {
  className?: string,
  children: ReactNode;
};

export const Page = memo((props: PropsType) => {
  const {
    className,
    children,
  } = props;

  return (
    <section className={classNames(cls.Page, {}, [className])}>
      {children}
    </section>
  );
});
