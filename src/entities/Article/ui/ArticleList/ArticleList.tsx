import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleListViewVariantEnum, IArticle } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';

type PropsType = {
  className?: string,
  articles: Array<IArticle>,
  isLoading?: boolean,
  view?: ArticleListViewVariantEnum,
};

export const ArticleList: FC<PropsType> = (props) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleListViewVariantEnum.CARDS,
  } = props;

  const renderArticle = (article: IArticle) => (
    <ArticleListItem article={article} view={view} />
  );

  return (
    <div className={classNames(cls.ArticleList, {}, [className])}>
      {
        articles.length > 0
          ? articles.map(renderArticle)
          : null
      }
    </div>
  );
};
