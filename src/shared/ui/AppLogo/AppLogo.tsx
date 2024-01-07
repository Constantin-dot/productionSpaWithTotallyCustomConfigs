import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { HStack } from '../Stack';
import AppSvg from '../../assets/icons/app-image.svg';

type PropsType = {
  className?: string;
};

export const AppLogo = memo((props: PropsType) => {
  const { className } = props;

  return (
    <HStack
      max
      justify="center"
      className={classNames(cls.AppLogo, {}, [className])}
    >
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      <AppSvg className={cls.appLogo} />
    </HStack>
  );
});
