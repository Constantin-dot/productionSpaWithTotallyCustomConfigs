import { IStateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsError = (state: IStateSchema) => state.articleDetailsComments?.error;
