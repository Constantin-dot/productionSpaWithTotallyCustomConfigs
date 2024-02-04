import { FC, memo } from 'react';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

export const ViewSelectorContainer: FC = memo(() => {
  const { view, onChangeView } = useArticleFilters();

  return <ArticleViewSelector view={view} onViewClick={onChangeView} />;
});
