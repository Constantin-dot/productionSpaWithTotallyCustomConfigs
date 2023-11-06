import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleTypeEnum, IArticle } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { getArcticlesType } from '../../selectors/getArcticlesType/getArcticlesType';
import { getArticlePageOrder } from '../../selectors/getArticlePageOrder/getArticlePageOrder';
import { getArticlePageSearch } from '../../selectors/getArticlePageSearch/getArticlePageSearch';
import { getArticlePageSort } from '../../selectors/getArticlePageSort/getArticlePageSort';
import { getArticlesPageLimit } from '../../selectors/getArticlesPageLimit/getArticlesPageLimit';
import { getArticlesPageNumber } from '../../selectors/getArticlesPageNumber/getArticlesPageNumber';

type PropsType = {
  replace?: boolean;
};

export const fetchArticlesList = createAsyncThunk<
  Array<IArticle>,
  PropsType,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticlesList',
  async (_, { extra, rejectWithValue, getState }) => {
    const limit = getArticlesPageLimit(getState());
    const sort = getArticlePageSort(getState());
    const order = getArticlePageOrder(getState());
    const search = getArticlePageSearch(getState());
    const page = getArticlesPageNumber(getState());
    const type = getArcticlesType(getState());

    try {
      addQueryParams({
        sort,
        order,
        search,
        type,
      });
      const response = await extra.api.get<Array<IArticle>>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
          type: type === ArticleTypeEnum.ALL ? undefined : type,
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
