import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProvider';
import { IComment } from 'entities/Comment';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { IArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

const commentsAdapter = createEntityAdapter<IComment>({
  selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<IStateSchema>(
  (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<IArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<Array<IComment>>) => {
        state.isLoading = false;
        state.error = undefined;
        commentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
