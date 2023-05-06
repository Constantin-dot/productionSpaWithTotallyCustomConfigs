import { ArticlePageFilters } from 'pages/ArticlesPage/ui/ArticlePageFilters/ArticlePageFilters';
import {
  FC, HTMLAttributeAnchorTarget, memo, useEffect, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso';
import { ARTICLE_LIST_ITEM_SESSIONSTORAGE_IDX } from 'shared/const/sessionstorage';
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
  view?: ArticleListViewVariantEnum,
  target?: HTMLAttributeAnchorTarget,
  onLoadNextPart?: () => void,
};

const getSkeletons = () => new Array(3)
  .fill(0)
  .map((_, index) => (
    <ArticleListItemSkeleton
      view={ArticleListViewVariantEnum.LIST}
      key={index}
      className={cls.card}
    />
  ));

export const ArticleList: FC<PropsType> = (props) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleListViewVariantEnum.LIST,
    target,
    onLoadNextPart,
  } = props;
  console.log(view);
  const { t } = useTranslation('article');
  const [selectedArticleId, setSelectedArticleId] = useState(1);
  const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

  useEffect(() => {
    const paged = sessionStorage.getItem(ARTICLE_LIST_ITEM_SESSIONSTORAGE_IDX) || 1;
    setSelectedArticleId(+paged);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (view === ArticleListViewVariantEnum.CARDS) {
      timeoutId = setTimeout(() => {
        if (virtuosoGridRef.current) {
          virtuosoGridRef.current.scrollToIndex(selectedArticleId);
        }
      }, 100);
    }

    return () => clearTimeout(timeoutId);
  }, [selectedArticleId, view]);

  const renderArticle = (index: number, article: IArticle) => (
    <ArticleListItem
      article={article}
      view={view}
      key={article.id}
      target={target}
      index={index}
      className={cls.card}
    />
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const Header = memo(() => <ArticlePageFilters />);
  // eslint-disable-next-line react/no-unstable-nested-components
  const Footer = memo(() => {
    if (isLoading) {
      return (
        <div className={cls.skeleton}>
          {getSkeletons()}
        </div>
      );
    }
    return null;
  });

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

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemContainerComp: FC<{height: number, width: number, index: number}> = ({ height, width, index }) => (
    <div className={cls.itemContainer}>
      <ArticleListItemSkeleton
        view={view}
        key={index}
        className={cls.card}
      />
    </div>
  );

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      { view === ArticleListViewVariantEnum.LIST ? (
        <Virtuoso
          style={{ height: '100%' }}
          data={articles}
          itemContent={renderArticle}
          endReached={onLoadNextPart}
          initialTopMostItemIndex={selectedArticleId}
          components={{
            Header,
            Footer,
          }}
        />
      ) : (
        <VirtuosoGrid
          ref={virtuosoGridRef}
          totalCount={articles.length}
          components={{
            Header,
            ScrollSeekPlaceholder: ItemContainerComp,
          }}
          endReached={onLoadNextPart}
          data={articles}
          itemContent={renderArticle}
          listClassName={cls.itemsWrapper}
          scrollSeekConfiguration={{
            enter: (velocity) => Math.abs(velocity) > 200,
            exit: (velocity) => Math.abs(velocity) < 30,
          }}
        />
      )}
      {/* {
        articles.length > 0
          ? articles.map(renderArticle)
          : null
      }
      {isLoading && getSkeletons(view)} */}
    </div>
  );
};
