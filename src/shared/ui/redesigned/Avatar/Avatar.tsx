import { CSSProperties, FC, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../../redesigned/AppImage';
import UserIcon from '../../../assets/icons/user-avatar.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

type PropsType = {
  className?: string;
  src: string;
  alt: string;
  size: number;
};

export const Avatar: FC<PropsType> = (props) => {
  const { className, src, alt, size = 100 } = props;

  const styles = useMemo<CSSProperties>(
    () => ({
      width: `${size}px`,
      height: `${size}px`,
    }),
    [size],
  );

  const fallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = <Icon width={size} height={size} Svg={UserIcon} />;

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, {}, [className])}
    />
  );
};
