import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { IComment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { getAddCommentFormText } from '../../selectors/addCommentFormSelectors';

export const sendComment = createAsyncThunk<
IComment,
void,
ThunkConfig<string>
>(
  'addCommentForm/sendComment',
  async (_, { extra, rejectWithValue, getState }) => {
    const userData = getUserAuthData(getState());
    const text = getAddCommentFormText(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
      return rejectWithValue('Error.No data');
    }

    try {
      const response = await extra.api.post<IComment>('/comments', {
        articleId: article?.id,
        userId: userData.id,
        text,
      });

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue('Entered incorrect date!');
    }
  },
);
