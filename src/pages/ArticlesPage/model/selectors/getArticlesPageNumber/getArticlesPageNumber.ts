import { IStateSchema } from 'app/providers/StoreProvider';

export const getArticlesPageNumber = (state: IStateSchema) => state.articlesPage?.page;
