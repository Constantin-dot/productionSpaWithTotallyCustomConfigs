import { IStateSchema } from '@/app/providers/StoreProvider';

export const getArticlesPageInited = (state: IStateSchema) =>
  state.articlesPage?._inited;
