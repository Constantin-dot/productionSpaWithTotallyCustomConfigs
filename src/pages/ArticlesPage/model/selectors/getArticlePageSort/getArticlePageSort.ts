import { IStateSchema } from '@/app/providers/StoreProvider';
import { ArticleSortFieldEnum } from '@/entities/Article';

export const getArticlePageSort = (state: IStateSchema) =>
  state.articlesPage?.sort || ArticleSortFieldEnum.CREATED;
