import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortFieldEnum, ArticleTypeEnum } from '@/entities/Article';
import { SortOrderType } from '@/shared/types/sort';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ITabItem } from '@/shared/ui/deprecated/Tabs';
import cls from './ArticlesFilters.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/deprecated/Input';

type TProps = {
  className?: string;
  sort: ArticleSortFieldEnum;
  order: SortOrderType;
  type: ArticleTypeEnum;
  search: string;
  onChangeSearch: (search: string | number) => void;
  onChangeOrder: (sort: SortOrderType) => void;
  onChangeSort: (order: ArticleSortFieldEnum) => void;
  onChangeType: (type: ITabItem) => void;
};

export const ArticlesFilters: FC<TProps> = memo((props) => {
  const {
    className,
    sort,
    order,
    type,
    search,
    onChangeSearch,
    onChangeOrder,
    onChangeSort,
    onChangeType,
  } = props;
  const { t } = useTranslation();

  return (
    <Card
      className={classNames(cls.ArticlesFilters, {}, [className])}
      padding="24"
    >
      <VStack gap="32" align="start">
        <Input
          placeholder={t('search') ?? ''}
          value={search}
          onChange={onChangeSearch}
        />
        <ArticleTypeTabs
          className={cls.tabs}
          value={type}
          onTabClick={onChangeType}
        />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});
