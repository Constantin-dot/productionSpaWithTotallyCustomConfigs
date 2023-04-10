import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProvider';
import { IComment } from 'entities/Comment';
import { IArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

const commentsAdapter = createEntityAdapter<IComment>({
  selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<IStateSchema>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
  name: 'books',
  initialState: commentsAdapter.getInitialState<IArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: ['1', '2'],
    entities: {
      1: {
        id: '1',
        text: 'comment 1',
        user: { id: '1', username: '1' },
      },
      2: {
        id: '2',
        text: 'comment 2',
        user: { id: '1', username: '1' },
      },
    },
  }),
  reducers: {},
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
