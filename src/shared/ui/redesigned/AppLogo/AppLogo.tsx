import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { HStack } from '../Stack';
import AppSvg from '../../../assets/icons/app-image.svg';

type PropsType = {
  className?: string;
  size?: number;
};

export const AppLogo = memo((props: PropsType) => {
  const { className, size = 50 } = props;

  return (
    <HStack
      max
      justify="center"
      className={classNames(cls.AppLogo, {}, [className])}
    >
      <AppSvg className={cls.appLogo} width={size} height={size} />
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
    </HStack>
  );
});
