import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleListViewVariantEnum, IArticle } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

type PropsType = {
  className?: string,
  articles: Array<IArticle>,
  isLoading?: boolean,
  view: ArticleListViewVariantEnum,
};

const getSkeletons = (view: ArticleListViewVariantEnum) => new Array(view === ArticleListViewVariantEnum.CARDS ? 9 : 3)
  .fill(0)
  .map((_, index) => (<ArticleListItemSkeleton view={view} key={index} />));

export const ArticleList: FC<PropsType> = (props) => {
  const {
    className,
    articles,
    isLoading,
    view,
  } = props;

  const renderArticle = (article: IArticle) => (
    <ArticleListItem
      article={article}
      view={view}
      key={article.id}
    />
  );

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {
        articles.length > 0
          ? articles.map(renderArticle)
          : null
      }
      {isLoading && getSkeletons(view)}
    </div>
  );
};
