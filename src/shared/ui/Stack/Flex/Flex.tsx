import { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
};

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn,
};

type PropsType = {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
};

export const Flex = (props: PropsType) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
  ];

  return (
    <div className={classNames(cls.Flex, {}, classes)}>
      {children}
    </div>
  );
};
