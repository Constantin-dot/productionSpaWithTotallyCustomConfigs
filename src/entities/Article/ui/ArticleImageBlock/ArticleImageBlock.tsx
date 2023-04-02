import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleImageBlock.module.scss';

type PropsType = {className?: string,};

export const ArticleImageBlock: FC<PropsType> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.ArticleImageBlock, {}, [className])}>
      Article Image Block
    </div>
  );
};
