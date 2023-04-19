import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { IArticle } from 'entities/Article';
import { getArticlesPageLimit } from '../../selectors/getArticlesPageLimit/getArticlesPageLimit';

interface IFetchArticlesListProps {
  page?: number;
}

export const fetchArticlesList = createAsyncThunk<
Array<IArticle>,
IFetchArticlesListProps,
ThunkConfig<string>
>(
  'articlesPage/fetchArticlesList',
  async (props, { extra, rejectWithValue, getState }) => {
    const { page = 1 } = props;
    const limit = getArticlesPageLimit(getState());
    try {
      const response = await extra.api.get<Array<IArticle>>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
        },
      });

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue('Something went wrong!');
    }
  },
);
