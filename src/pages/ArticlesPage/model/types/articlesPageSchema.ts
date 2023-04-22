import { EntityState } from '@reduxjs/toolkit';
import { ArticleListViewVariantEnum, IArticle } from 'entities/Article';
import { ArticleSortFieldEnum } from 'entities/Article/model/types/article';
import { SortOrderType } from 'shared/types';

export interface IArticlesPageSchema extends EntityState<IArticle> {
  isLoading?: boolean;
  error?: string;
  view: ArticleListViewVariantEnum;
  order: SortOrderType;
  sort: ArticleSortFieldEnum,
  search: string,
  page: number;
  limit: number;
  hasMore: boolean;
  _inited?: boolean;
}
