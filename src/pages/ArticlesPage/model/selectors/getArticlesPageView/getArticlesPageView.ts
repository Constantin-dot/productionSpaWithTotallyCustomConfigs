import { IStateSchema } from 'app/providers/StoreProvider';
import { ArticleListViewVariantEnum } from 'entities/Article';

export const getArticlesPageView = (state: IStateSchema) => state.articlesPage?.view
|| ArticleListViewVariantEnum.CARDS;
