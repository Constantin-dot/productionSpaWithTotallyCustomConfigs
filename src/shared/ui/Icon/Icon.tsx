import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type PropsType = {
  className?: string,
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>,
  inverted?: boolean,
};

export const Icon: FC<PropsType> = (props) => {
  const {
    className,
    Svg,
    inverted,
  } = props;

  return (
    <Svg
      className={classNames(
        inverted ? cls.inverted : cls.Icon,
        {},
        [className],
      )}
    />
  );
};
