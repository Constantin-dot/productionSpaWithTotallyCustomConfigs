import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortFieldEnum, ArticleTypeEnum } from '@/entities/Article';
import { SortOrderType } from '@/shared/types/sort';
import { getArticlesPageInited } from '../../selectors/getArticlesPageInited/getArticlesPageInited';
import { articlesPageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
void,
URLSearchParams,
ThunkConfig<string>
>(
  'articlesPage/initArticlesPage',
  async (searchParams, {
    getState, dispatch,
  }) => {
    const inited = getArticlesPageInited(getState());
    if (!inited) {
      const orderFromUrl = searchParams.get('order') as SortOrderType;
      const sortFromUrl = searchParams.get('sort') as ArticleSortFieldEnum;
      const searchFromUrl = searchParams.get('search');
      const typeFromUrl = searchParams.get('type') as ArticleTypeEnum;

      if (orderFromUrl) {
        dispatch(articlesPageActions.setOrder(orderFromUrl));
      }
      if (sortFromUrl) {
        dispatch(articlesPageActions.setSort(sortFromUrl));
      }
      if (searchFromUrl) {
        dispatch(articlesPageActions.setSearch(searchFromUrl));
      }
      if (typeFromUrl) {
        dispatch(articlesPageActions.setType(typeFromUrl));
      }

      dispatch(articlesPageActions.initState());
      dispatch(fetchArticlesList({}));
    }
  },
);
