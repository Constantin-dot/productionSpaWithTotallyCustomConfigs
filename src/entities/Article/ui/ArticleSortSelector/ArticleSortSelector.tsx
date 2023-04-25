import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { SortOrderType } from 'shared/types';
import { Select, ISelectOption } from 'shared/ui/Select/Select';
import { ArticleSortFieldEnum } from '../../model/types/article';
import cls from './ArticleSortSelector.module.scss';

type PropsType = {
  className?: string,
  sort: ArticleSortFieldEnum,
  order: SortOrderType,
  onChangeSort: (newSort: ArticleSortFieldEnum) => void,
  onChangeOrder: (newOrder: SortOrderType) => void,
};

export const ArticleSortSelector = memo((props: PropsType) => {
  const {
    className,
    sort,
    order,
    onChangeSort,
    onChangeOrder,
  } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<Array<ISelectOption<SortOrderType>>>(() => [
    {
      value: 'asc',
      content: t('asc'),
    },
    {
      value: 'desc',
      content: t('desc'),
    },
  ], [t]);

  const sortFieldOptions = useMemo<Array<ISelectOption<ArticleSortFieldEnum>>>(() => [
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
  ], [t]);

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
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
  );
});
