import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleCodeBlock.module.scss';

type PropsType = {className?: string,};

export const ArticleCodeBlock: FC<PropsType> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.ArticleCodeBlock, {}, [className])}>
      Article Code Block
    </div>
  );
};
