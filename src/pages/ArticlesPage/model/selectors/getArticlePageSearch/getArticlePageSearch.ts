import { IStateSchema } from '@/app/providers/StoreProvider';

export const getArticlePageSearch = (state: IStateSchema) =>
  state.articlesPage?.search || '';
