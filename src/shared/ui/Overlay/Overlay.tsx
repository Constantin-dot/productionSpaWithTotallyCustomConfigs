import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';

type PropsType = {
  className?: string;
  onClick?: () => void;
};

export const Overlay = memo((props: PropsType) => {
  const { className, onClick } = props;

  return (
    <div
      className={classNames(cls.Overlay, {}, [className])}
      onClick={onClick}
    />
  );
});
