import { FC, HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSizeEnum } from '@/shared/ui/deprecated/Text';
import type { IArticle } from '../../model/types/article';
import { ArticleListViewVariantEnum } from '../../model/consts/consts';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

type PropsType = {
  className?: string;
  articles: Array<IArticle>;
  isLoading?: boolean;
  view?: ArticleListViewVariantEnum;
  target?: HTMLAttributeAnchorTarget;
};

const getSkeletons = (view: ArticleListViewVariantEnum) =>
  new Array(view === ArticleListViewVariantEnum.CARDS ? 9 : 3)
    .fill(0)
    .map((_, index) => <ArticleListItemSkeleton view={view} key={index} />);

export const ArticleList: FC<PropsType> = (props) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleListViewVariantEnum.LIST,
    target,
  } = props;
  const { t } = useTranslation('article');

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text title={t('hasNotArticles')} size={TextSizeEnum.L} />
      </div>
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={
        <HStack
          gap="16"
          wrap="wrap"
          className={classNames(cls.RedesignedArticleList, {}, [
            className,
            cls[view],
          ])}
          data-testid="ArticleList"
        >
          {articles?.map((article) => (
            <ArticleListItem
              article={article}
              view={view}
              key={article.id}
              target={target}
            />
          ))}
          {isLoading && getSkeletons(view)}
        </HStack>
      }
      off={
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
          data-testid="ArticleList"
        >
          {articles?.map((article) => (
            <ArticleListItem
              article={article}
              view={view}
              key={article.id}
              target={target}
            />
          ))}
          {isLoading && getSkeletons(view)}
        </div>
      }
    />
  );
};
