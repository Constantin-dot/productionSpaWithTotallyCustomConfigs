import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IComment } from '@/entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
  Array<IComment>,
  string | undefined,
  ThunkConfig<string>
>(
  'pages/fetchCommentsByArticleId',
  async (articleId, { extra, rejectWithValue }) => {
    if (!articleId) {
      return rejectWithValue('Error!Have not article id.');
    }

    try {
      const response = await extra.api.get<Array<IComment>>('/comments', {
        params: {
          articleId,
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
