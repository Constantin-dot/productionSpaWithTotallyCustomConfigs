import { EntityState } from '@reduxjs/toolkit';
import { ArticleListViewVariantEnum, IArticle } from 'entities/Article';

export interface IArticlesPageSchema extends EntityState<IArticle> {
  isLoading?: boolean;
  error?: string;
  view: ArticleListViewVariantEnum;
}
