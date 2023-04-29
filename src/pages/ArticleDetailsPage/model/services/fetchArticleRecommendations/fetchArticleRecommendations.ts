import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { IArticle } from 'entities/Article';

export const fetchArticleRecommendations = createAsyncThunk<
Array<IArticle>,
void,
ThunkConfig<string>
>(
  'articlesDetailsPage/fetchArticleRecommendations',
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Array<IArticle>>('/articles', {
        params: {
          _expand: 'user',
          _limit: 4,
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
