import { CSSProperties, FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

type PropsType = {
  className?: string,
  height?: string | number,
  width?: string | number,
  border?: string
};

export const Skeleton: FC<PropsType> = (props) => {
  const {
    className,
    height,
    width,
    border,
  } = props;

  const styles: CSSProperties = {
    height,
    width,
    borderRadius: border,
  };

  return (
    <div
      className={classNames(cls.Skeleton, {}, [className])}
      style={styles}
    />
  );
};
