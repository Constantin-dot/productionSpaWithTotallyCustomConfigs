import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IArticle } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
  IArticle,
  string | undefined,
  ThunkConfig<string>
>(
  'entities/fetchArticleById',
  async (articleId, { extra, rejectWithValue }) => {
    try {
      if (!articleId) {
        throw new Error();
      }

      const response = await extra.api.get<IArticle>(`/articles/${articleId}`, {
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
