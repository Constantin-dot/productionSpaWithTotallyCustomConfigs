import {
  ArticleListViewVariantEnum, ArticleSortFieldEnum, ArticleSortSelector, ArticleViewSelector,
} from 'entities/Article';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { SortOrderType } from 'shared/types';
import { getArticlePageSort } from 'pages/ArticlesPage/model/selectors/getArticlePageSort/getArticlePageSort';
import { getArticlePageOrder } from 'pages/ArticlesPage/model/selectors/getArticlePageOrder/getArticlePageOrder';
import { getArticlePageSearch } from 'pages/ArticlesPage/model/selectors/getArticlePageSearch/getArticlePageSearch';
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView/getArticlesPageView';
import { articlesPageActions } from '../../model/slices/articlePageSlice';
import cls from './ArticlePageFilters.module.scss';

type PropsType = {className?: string,};

export const ArticlePageFilters = memo((props: PropsType) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const view = useSelector(getArticlesPageView);
  const sort = useSelector(getArticlePageSort);
  const order = useSelector(getArticlePageOrder);
  const search = useSelector(getArticlePageSearch);

  const onChangeView = useCallback((view: ArticleListViewVariantEnum) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);

  const onChangeSort = useCallback((sort: ArticleSortFieldEnum) => {
    dispatch(articlesPageActions.setSort(sort));
  }, [dispatch]);

  const onChangeOrder = useCallback((order: SortOrderType) => {
    dispatch(articlesPageActions.setOrder(order));
  }, [dispatch]);

  const onChangeSearch = useCallback((value: string | number) => {
    dispatch(articlesPageActions.setSearch(String(value)));
  }, [dispatch]);

  return (
    <div className={classNames(cls.ArticlePageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input
          placeholder={t('search')}
          value={search}
          onChange={onChangeSearch}
        />
      </Card>
    </div>
  );
});
