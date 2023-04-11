import { IStateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: IStateSchema) => state.articleDetailsComments?.isLoading || false;
export const getArticleCommentsError = (state: IStateSchema) => state.articleDetailsComments?.error;
