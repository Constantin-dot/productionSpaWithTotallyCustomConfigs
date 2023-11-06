import { IStateSchema } from '@/app/providers/StoreProvider';

export const getArticlePageOrder = (state: IStateSchema) =>
  state.articlesPage?.order || 'asc';
