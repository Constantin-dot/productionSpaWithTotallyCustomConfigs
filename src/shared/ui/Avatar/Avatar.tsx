import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

type PropsType = {
  className?: string,
  src: string,
  username?: string,
};

export const Avatar: FC<PropsType> = (props) => {
  const {
    className,
    src,
    username = '',
  } = props;

  return (
    <img
      src={src}
      alt={`${username} avatar`}
      className={classNames(cls.Avatar, {}, [className])}
    />
  );
};
