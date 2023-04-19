import { IStateSchema } from 'app/providers/StoreProvider';

export const getArticlesPageLimit = (state: IStateSchema) => state.articlesPage?.limit || 9;
