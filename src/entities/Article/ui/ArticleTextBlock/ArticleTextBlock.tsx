import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleTextBlock.module.scss';

type PropsType = {className?: string,};

export const ArticleTextBlock: FC<PropsType> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.ArticleTextBlock, {}, [className])}>
      Article Text Block
    </div>
  );
};
