import { IStateSchema } from 'app/providers/StoreProvider';
import { ArticleTypeEnum } from 'entities/Article/model/types/article';

export const getArcticlesType = (state: IStateSchema) => state.articlesPage?.type || ArticleTypeEnum.ALL;
