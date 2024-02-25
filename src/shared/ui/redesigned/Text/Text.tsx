import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TTextVariant = 'primary' | 'accent' | 'error';

export type TTextAlign = 'right' | 'left' | 'center';

export type TTextSize = 's' | 'm' | 'l' | 'xl';

type PropsType = {
  className?: string;
  title?: string | null;
  text?: string | null;
  variant?: TTextVariant;
  align?: TTextAlign;
  size?: TTextSize;
  'data-testid'?: string;
};

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4';

const mapSizeToClass: Record<TTextSize, string> = {
  s: 'sizeS',
  m: 'sizeM',
  l: 'sizeL',
  xl: 'sizeXL',
};

const mapSizeToHeaderTag: Record<TTextSize, HeaderTagType> = {
  s: 'h4',
  m: 'h3',
  l: 'h2',
  xl: 'h1',
};

export const Text = memo((props: PropsType) => {
  const {
    className,
    title,
    text,
    variant = 'primary',
    align = 'left',
    size = 'm',
    'data-testid': dataTestId = 'Text',
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];
  const sizeClass = mapSizeToClass[size];

  const additionalClasses = [className, cls[align], cls[variant], sizeClass];

  return (
    <div className={classNames(cls.Text, {}, additionalClasses)}>
      {title && (
        <HeaderTag
          className={classNames(cls.title, {}, [])}
          data-testid={`${dataTestId}.Header`}
        >
          {title}
        </HeaderTag>
      )}
      {text && (
        <p
          className={classNames(cls.text, {}, [])}
          data-testid={`${dataTestId}.Paragraph`}
        >
          {text}
        </p>
      )}
    </div>
  );
});
