import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextVariantEnum {
  PRIMARY = 'primary',
  ERROR = 'error',
}

type PropsType = {
  className?: string,
  title?: string,
  text?: string,
  variant?: TextVariantEnum,
};

export const Text = memo((props: PropsType) => {
  const {
    className,
    title,
    text,
    variant = TextVariantEnum.PRIMARY,
  } = props;

  return (
    <div className={classNames(cls.Text, { [cls[variant]]: true }, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});
