import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ITabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleTypeEnum } from '../../model/consts/consts';

type PropsType = {
  className?: string,
  value: ArticleTypeEnum,
  onTabClick: (tab: ITabItem) => void,
};

export const ArticleTypeTabs: FC<PropsType> = (props) => {
  const {
    className,
    value,
    onTabClick,
  } = props;

  const { t } = useTranslation('article');

  const typeTabs = useMemo<ITabItem[]>(() => [
    {
      value: ArticleTypeEnum.ALL,
      content: t(ArticleTypeEnum.ALL),
    },
    {
      value: ArticleTypeEnum.IT,
      content: t(ArticleTypeEnum.IT),
    },
    {
      value: ArticleTypeEnum.ECONOMICS,
      content: t(ArticleTypeEnum.ECONOMICS),
    },
    {
      value: ArticleTypeEnum.SCIENCE,
      content: t(ArticleTypeEnum.SCIENCE),
    },
  ], [t]);

  return (
    <Tabs
      className={classNames('', {}, [className])}
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
    />
  );
};
