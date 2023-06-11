import { IStateSchema } from '@/app/providers/StoreProvider';

export const getArticlesPageError = (state: IStateSchema) => state.articlesPage?.error;
