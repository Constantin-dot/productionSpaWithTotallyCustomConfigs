import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProvider';
import { ArticleListViewVariantEnum, IArticle } from 'entities/Article';
import { ARTICLES_VIEW_LOCAL_STORAGE_KEY } from 'shared/const/localstorage';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
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
      localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY, action.payload);
    },
    initState: (state) => {
      state.view = localStorage.getItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY) as ArticleListViewVariantEnum;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Array<IArticle>>) => {
        state.isLoading = false;
        state.error = undefined;
        articlesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
