import { memo, useCallback, useMemo } from 'react';
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

  const changeSortHandler = useCallback((value: string) => {
    onChangeSort(value as ArticleSortFieldEnum);
  }, [onChangeSort]);

  const changeOrderHandler = useCallback((value: string) => {
    onChangeOrder(value as SortOrderType);
  }, [onChangeOrder]);

  const orderOptions = useMemo<Array<ISelectOption>>(() => [
    {
      value: 'asc',
      content: t('asc'),
    },
    {
      value: 'desc',
      content: t('desc'),
    },
  ], [t]);

  const sortFieldOptions = useMemo<Array<ISelectOption>>(() => [
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
        options={orderOptions}
        value={sort}
        onChange={changeSortHandler}
      />
      <Select
        label={t('by')}
        options={sortFieldOptions}
        value={order}
        onChange={changeOrderHandler}
      />
    </div>
  );
});
