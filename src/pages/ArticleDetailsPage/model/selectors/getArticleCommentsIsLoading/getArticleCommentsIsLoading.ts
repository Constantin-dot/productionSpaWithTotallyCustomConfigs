import { IStateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: IStateSchema) => state.articleDetailsPage?.comments?.isLoading || false;
