import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSizeEnum } from 'shared/ui/Text/Text';
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
  const { t } = useTranslation('article');

  const renderArticle = (article: IArticle) => (
    <ArticleListItem
      article={article}
      view={view}
      key={article.id}
    />
  );

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text
          title={t('hasNotArticles')}
          size={TextSizeEnum.L}
        />
      </div>
    );
  }

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
