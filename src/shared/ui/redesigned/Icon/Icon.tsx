import { FC, SVGProps, VFC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type TSvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IIconBaseProps extends TSvgProps {
  className?: string;
  Svg: VFC<SVGProps<SVGSVGElement>>;
}

interface INonClickableIconProps extends IIconBaseProps {
  clickable?: false;
}

interface IClickableIconProps extends IIconBaseProps {
  clickable: true;
  onClick: () => void;
}

type TIconProps = INonClickableIconProps | IClickableIconProps;

export const Icon: FC<TIconProps> = (props) => {
  const {
    className,
    Svg,
    width = 32,
    height = 32,
    clickable,
    ...otherProps
  } = props;

  const icon = (
    <Svg
      className={classNames(cls.Icon, {}, [className])}
      width={width}
      height={height}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable) {
    return (
      <button
        type="button"
        className={cls.button}
        // eslint-disable-next-line react/destructuring-assignment
        onClick={props.onClick}
        style={{ width, height }}
      >
        {icon}
      </button>
    );
  }

  return icon;
};
