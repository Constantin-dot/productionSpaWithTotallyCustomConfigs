import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrderType } from '@/shared/types/sort';
import { Select, ISelectOption } from '@/shared/ui/deprecated/Select';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortFieldEnum } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

type PropsType = {
  className?: string;
  sort: ArticleSortFieldEnum;
  order: SortOrderType;
  onChangeSort: (newSort: ArticleSortFieldEnum) => void;
  onChangeOrder: (newOrder: SortOrderType) => void;
};

export const ArticleSortSelector = memo((props: PropsType) => {
  const { className, sort, order, onChangeSort, onChangeOrder } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<Array<ISelectOption<SortOrderType>>>(
    () => [
      {
        value: 'asc',
        content: t('asc'),
      },
      {
        value: 'desc',
        content: t('desc'),
      },
    ],
    [t],
  );

  const sortFieldOptions = useMemo<Array<ISelectOption<ArticleSortFieldEnum>>>(
    () => [
      {
        value: ArticleSortFieldEnum.CREATED,
        content: t(ArticleSortFieldEnum.CREATED),
      },
      {
        value: ArticleSortFieldEnum.TITLE,
        content: t(ArticleSortFieldEnum.TITLE),
      },
      {
        value: ArticleSortFieldEnum.VIEWS,
        content: t(ArticleSortFieldEnum.VIEWS),
      },
    ],
    [t],
  );

  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
          <VStack gap="8" align="start">
            <Text title={t('sortBy')} size="s" />
            <ListBox
              items={sortFieldOptions}
              value={sort}
              onChange={onChangeSort}
            />
            <ListBox
              items={orderOptions}
              value={order}
              onChange={onChangeOrder}
              className={cls.order}
            />
          </VStack>
        </div>
      }
      off={
        <div
          className={classNames(cls.DeprecatedArticleSortSelector, {}, [
            className,
          ])}
        >
          <Select
            label={t('sortBy')}
            options={sortFieldOptions}
            value={sort}
            onChange={onChangeSort}
          />
          <Select
            label={t('by')}
            options={orderOptions}
            value={order}
            onChange={onChangeOrder}
            className={cls.order}
          />
        </div>
      }
    />
  );
});
