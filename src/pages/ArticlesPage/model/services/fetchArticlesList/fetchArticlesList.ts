import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { IArticle } from 'entities/Article';

export const fetchArticlesList = createAsyncThunk<
Array<IArticle>,
void,
ThunkConfig<string>
>(
  'articlesPage/fetchArticlesList',
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Array<IArticle>>('/articles', {
        params: {
          _expand: 'user',
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
