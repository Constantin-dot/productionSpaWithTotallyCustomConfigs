import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import {
  ArticleListViewVariantEnum,
  ArticleSortFieldEnum,
  ArticleTypeEnum,
} from '@/entities/Article';
import { SortOrderType } from '@/shared/types/sort';
import { ITabItem } from '@/shared/ui/deprecated/Tabs';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { getArticlePageSort } from '../../model/selectors/getArticlePageSort/getArticlePageSort';
import { getArticlePageOrder } from '../../model/selectors/getArticlePageOrder/getArticlePageOrder';
import { getArticlePageSearch } from '../../model/selectors/getArticlePageSearch/getArticlePageSearch';
import { getArcticlesType } from '../../model/selectors/getArcticlesType/getArcticlesType';
import { articlesPageActions } from '../../model/slices/articlePageSlice';
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView/getArticlesPageView';

export function useArticleFilters() {
  const dispatch = useAppDispatch();

  const sort = useSelector(getArticlePageSort);
  const order = useSelector(getArticlePageOrder);
  const search = useSelector(getArticlePageSearch);
  const type = useSelector(getArcticlesType);
  const view = useSelector(getArticlesPageView);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 1000);

  const onChangeSort = useCallback(
    (sort: ArticleSortFieldEnum) => {
      dispatch(articlesPageActions.setSort(sort));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeOrder = useCallback(
    (order: SortOrderType) => {
      dispatch(articlesPageActions.setOrder(order));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSearch = useCallback(
    (value: string | number) => {
      dispatch(articlesPageActions.setSearch(String(value)));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeType = useCallback(
    (tab: ITabItem) => {
      dispatch(articlesPageActions.setType(tab.value as ArticleTypeEnum));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeView = useCallback(
    (view: ArticleListViewVariantEnum) => {
      dispatch(articlesPageActions.setView(view));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  return {
    sort,
    order,
    search,
    type,
    view,
    onChangeSort,
    onChangeOrder,
    onChangeSearch,
    onChangeType,
    onChangeView,
  };
}
