import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from '../../selectors/getArticlesPageInited/getArticlesPageInited';
import { articlesPageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
void,
void,
ThunkConfig<string>
>(
  'articlesPage/initArticlesPage',
  async (_, {
    getState, dispatch,
  }) => {
    const inited = getArticlesPageInited(getState());
    if (!inited) {
      dispatch(articlesPageActions.initState());
      dispatch(fetchArticlesList({}));
    }
  },
);
