import { IStateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: IStateSchema) => state.articleDetailsComments?.isLoading || false;
