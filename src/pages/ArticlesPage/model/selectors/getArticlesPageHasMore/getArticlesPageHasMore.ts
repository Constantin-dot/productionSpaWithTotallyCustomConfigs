import { IStateSchema } from '@/app/providers/StoreProvider';

export const getArticlesPageHasMore = (state: IStateSchema) => state.articlesPage?.hasMore;
