import { FC, SVGProps, VFC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IPropsType extends SVGProps<SVGSVGElement> {
  className?: string,
  Svg: VFC<SVGProps<SVGSVGElement>>,
  inverted?: boolean,
}

export const Icon: FC<IPropsType> = (props) => {
  const {
    className,
    Svg,
    inverted,
    ...otherProps
  } = props;

  return (
    <Svg
      className={classNames(
        inverted ? cls.inverted : cls.Icon,
        {},
        [className],
      )}
      {...otherProps}
    />
  );
};
