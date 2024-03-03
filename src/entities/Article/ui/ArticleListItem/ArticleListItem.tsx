import { HTMLAttributeAnchorTarget, memo } from 'react';

import { ArticleListViewVariantEnum } from '../../model/consts/consts';
import type { IArticle } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { DeprecatedArticleListItem } from './DeprecatedArticleListItem/DeprecatedArticleListItem';
import { RedesignedArticleListItem } from './RedesignedArticleListItem/RedesignedArticleListItem';

export type TArticleListItemProps = {
  className?: string;
  article: IArticle;
  view: ArticleListViewVariantEnum;
  target?: HTMLAttributeAnchorTarget;
};

export const ArticleListItem = memo((props: TArticleListItemProps) => (
  <ToggleFeatures
    feature="isAppRedisigned"
    on={<RedesignedArticleListItem {...props} />}
    off={<DeprecatedArticleListItem {...props} />}
  />
));
