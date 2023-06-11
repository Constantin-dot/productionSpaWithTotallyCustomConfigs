import { IStateSchema } from '@/app/providers/StoreProvider';

export const getArticlesPageIsLoading = (state: IStateSchema) => state.articlesPage?.isLoading || false;
