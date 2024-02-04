import { FC, memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

type TProps = {
  className?: string;
};

export const FiltersContainer: FC<TProps> = memo((props) => {
  const { className } = props;

  const {
    sort,
    order,
    search,
    type,
    onChangeSort,
    onChangeOrder,
    onChangeSearch,
    onChangeType,
  } = useArticleFilters();

  return (
    <ArticlesFilters
      className={className}
      sort={sort}
      order={order}
      search={search}
      type={type}
      onChangeSort={onChangeSort}
      onChangeOrder={onChangeOrder}
      onChangeSearch={onChangeSearch}
      onChangeType={onChangeType}
    />
  );
});
