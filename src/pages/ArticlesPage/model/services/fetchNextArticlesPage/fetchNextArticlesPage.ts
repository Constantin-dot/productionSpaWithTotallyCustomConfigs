import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticlesPageHasMore } from '../../selectors/getArticlesPageHasMore/getArticlesPageHasMore';
import { getArticlesPageIsLoading } from '../../selectors/getArticlesPageIsLoading/getArticlesPageIsLoading';
import { getArticlesPageNumber } from '../../selectors/getArticlesPageNumber/getArticlesPageNumber';
import { articlesPageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('articlesPage/fetchNextArticlesPage', async (_, { getState, dispatch }) => {
  const hasMore = getArticlesPageHasMore(getState());
  const page = getArticlesPageNumber(getState());
  const isLoading = getArticlesPageIsLoading(getState());

  if (__PROJECT__ !== 'storybook' && hasMore && !isLoading) {
    dispatch(articlesPageActions.setPage(page + 1));
    dispatch(fetchArticlesList({}));
  }
});
