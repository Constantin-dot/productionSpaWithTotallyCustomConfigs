import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type PropsType = {
  className?: string,
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>,
};

export const Icon: FC<PropsType> = (props) => {
  const {
    className,
    Svg,
  } = props;

  return (
    <Svg className={classNames(cls.Icon, {}, [className])} />
  );
};
