import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { IStateSchema } from '@/app/providers/StoreProvider';
import {
  ArticleListViewVariantEnum,
  ArticleSortFieldEnum,
  ArticleTypeEnum,
  IArticle,
} from '@/entities/Article';
import { ARTICLES_VIEW_LOCAL_STORAGE_KEY } from '@/shared/const/localstorage';
import { SortOrderType } from '@/shared/types/sort';
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
    order: 'asc',
    sort: ArticleSortFieldEnum.CREATED,
    search: '',
    ids: [],
    entities: {},
    page: 1,
    limit: 4,
    hasMore: true,
    type: ArticleTypeEnum.ALL,
    _inited: false,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleListViewVariantEnum>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrderType>) => {
      state.order = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortFieldEnum>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleTypeEnum>) => {
      state.type = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLES_VIEW_LOCAL_STORAGE_KEY,
      ) as ArticleListViewVariantEnum;
      state.view = view;
      state.limit = view === ArticleListViewVariantEnum.LIST ? 4 : 9;
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;

        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state);
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.hasMore = action.payload.length >= state.limit;

        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload);
        } else {
          articlesAdapter.addMany(state, action.payload);
        }
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
