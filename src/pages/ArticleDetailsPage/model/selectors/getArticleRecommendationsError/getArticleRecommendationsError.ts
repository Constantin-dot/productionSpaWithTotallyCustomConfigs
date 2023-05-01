import { IStateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationsError = (state: IStateSchema) => state.articleDetailsRecommendations?.error || '';
// export const getArticleRecommendationsError = (state: IStateSchema) => state.articleDetailsPage?.recommendations?.error || '';
