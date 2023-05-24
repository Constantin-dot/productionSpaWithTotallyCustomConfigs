import { memo } from 'react';
import { classNames, ModsType } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextVariantEnum {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  ERROR = 'error',
}

export enum TextAlignEnum {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum TextSizeEnum {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

type PropsType = {
  className?: string,
  title?: string,
  text?: string,
  variant?: TextVariantEnum,
  align?: TextAlignEnum,
  size?: TextSizeEnum,
};

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4';

const mapSizeToHeaderTag: Record<TextSizeEnum, HeaderTagType> = {
  [TextSizeEnum.S]: 'h4',
  [TextSizeEnum.M]: 'h3',
  [TextSizeEnum.L]: 'h2',
  [TextSizeEnum.XL]: 'h1',
};

export const Text = memo((props: PropsType) => {
  const {
    className,
    title,
    text,
    variant = TextVariantEnum.PRIMARY,
    align = TextAlignEnum.LEFT,
    size = TextSizeEnum.M,
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];

  const mods: ModsType = {
    [cls[variant]]: true,
    [cls[align]]: true,
    [cls[size]]: true,
  };

  return (
    <div className={classNames(cls.Text, mods, [className])}>
      {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});
