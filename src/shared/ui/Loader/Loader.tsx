import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

type PropsType = {className?: string,};

export const Loader: FC<PropsType> = (props) => {
  const { className } = props;

  return (
    <div className={classNames('lds-grid', {}, [className])}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
