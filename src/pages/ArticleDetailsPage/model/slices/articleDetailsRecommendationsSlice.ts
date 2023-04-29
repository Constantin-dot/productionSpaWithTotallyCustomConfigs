import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProvider';
import { IArticle } from 'entities/Article';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { IArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';

const recommendationsAdapter = createEntityAdapter<IArticle>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<IStateSchema>(
  (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

export const articleDetailsRecommendationsSlice = createSlice({
  name: 'articleDetailsRecommendations',
  initialState: recommendationsAdapter.getInitialState<IArticleDetailsRecommendationsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {
    // setView: (state, action: PayloadAction<ArticleListViewVariantEnum>) => {
    //   state.view = action.payload;
    //   localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY, action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;

        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleDetailsRecommendationsActions } = articleDetailsRecommendationsSlice;
export const { reducer: articleDetailsRecommendationsReducer } = articleDetailsRecommendationsSlice;
