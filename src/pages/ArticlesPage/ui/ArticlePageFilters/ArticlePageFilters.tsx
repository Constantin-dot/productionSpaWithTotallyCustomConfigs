import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import cls from './ArticlePageFilters.module.scss';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

type PropsType = { className?: string };

export const ArticlePageFilters = memo((props: PropsType) => {
  const { className } = props;
  const { t } = useTranslation();

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
    <div className={classNames(cls.ArticlePageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ViewSelectorContainer />
      </div>
      <Card className={cls.search}>
        <Input
          placeholder={t('search') ?? ''}
          value={search}
          onChange={onChangeSearch}
        />
      </Card>
      <ArticleTypeTabs
        className={cls.tabs}
        value={type}
        onTabClick={onChangeType}
      />
    </div>
  );
});
