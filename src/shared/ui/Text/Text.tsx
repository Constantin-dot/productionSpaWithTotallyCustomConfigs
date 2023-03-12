import { FC, memo } from 'react';
import { classNames, ModsType } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextVariantEnum {
  PRIMARY = 'primary',
  ERROR = 'error',
}

export enum TextAlignEnum {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

type PropsType = {
  className?: string,
  title?: string,
  text?: string,
  variant?: TextVariantEnum,
  align?: TextAlignEnum,
};

export const Text = memo((props: PropsType) => {
  const {
    className,
    title,
    text,
    variant = TextVariantEnum.PRIMARY,
    align = TextAlignEnum.LEFT,
  } = props;

  const mods: ModsType = {
    [cls[variant]]: true,
    [cls[align]]: true,
  };

  return (
    <div className={classNames(cls.Text, mods, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});
