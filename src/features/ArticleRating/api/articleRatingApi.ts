import { rtkApi } from '@/shared/api/rtkApi';
import { IRating } from '@/entities/Rating';

type GetArticleRequestType = { userId: string; articleId: string };
type RateArticleBodyType = {
  userId: string;
  articleId: string;
  rate: number;
  feedback?: string;
};

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Array<IRating>, GetArticleRequestType>({
      query: ({ userId, articleId }) => ({
        url: '/article-ratings',
        params: {
          userId,
          articleId,
        },
      }),
    }),
    rateArticle: build.mutation<void, RateArticleBodyType>({
      query: (args) => ({
        url: '/article-ratings',
        method: 'POST',
        body: args,
      }),
    }),
  }),
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
