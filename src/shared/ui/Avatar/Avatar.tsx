import { CSSProperties, FC, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

type PropsType = {
  className?: string,
  src: string,
  alt: string,
  size: number,
};

export const Avatar: FC<PropsType> = (props) => {
  const {
    className,
    src,
    alt,
    size,
  } = props;

  const styles = useMemo<CSSProperties>(() => ({
    width: `${size}px`,
    height: `${size}px`,
  }), [size]);

  return (
    <img
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, {}, [className])}
    />
  );
};
