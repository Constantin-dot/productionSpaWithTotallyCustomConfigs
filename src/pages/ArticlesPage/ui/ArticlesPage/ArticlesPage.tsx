import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';

type PropsType = {className?: string,};

const ArticlesPage: FC<PropsType> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      Articles Page
    </div>
  );
};

export default memo(ArticlesPage);
