import { IStateSchema } from '@/app/providers/StoreProvider';
import { ArticleTypeEnum } from '@/entities/Article';

export const getArcticlesType = (state: IStateSchema) => state.articlesPage?.type || ArticleTypeEnum.ALL;
