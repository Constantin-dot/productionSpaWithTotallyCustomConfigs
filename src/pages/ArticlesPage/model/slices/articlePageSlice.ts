import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProvider';
import { ArticleListViewVariantEnum, IArticle } from 'entities/Article';
import { IArticlesPageSchema } from '../types/articlesPageSchema';

const articlesAdapter = createEntityAdapter<IArticle>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<IStateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

export const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState: articlesAdapter.getInitialState<IArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    view: ArticleListViewVariantEnum.CARDS,
    ids: [],
    entities: {},
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleListViewVariantEnum>) => {
      state.view = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchArticleById.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = undefined;
    //   })
    //   .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<IArticle>) => {
    //     state.isLoading = false;
    //     state.error = undefined;
    //     state.data = action.payload;
    //   })
    //   .addCase(fetchArticleById.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   });
  },
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
