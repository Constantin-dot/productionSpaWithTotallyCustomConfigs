import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ITabItem, Tabs as DeprecatedTabs } from '@/shared/ui/deprecated/Tabs';
import { ArticleTypeEnum } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

type PropsType = {
  className?: string;
  value: ArticleTypeEnum;
  onTabClick: (tab: ITabItem) => void;
};

export const ArticleTypeTabs: FC<PropsType> = (props) => {
  const { className, value, onTabClick } = props;

  const { t } = useTranslation('article');

  const typeTabs = useMemo<ITabItem[]>(
    () => [
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
    ],
    [t],
  );

  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={
        <Tabs
          className={classNames('', {}, [className])}
          tabs={typeTabs}
          value={value}
          onTabClick={onTabClick}
          direction="column"
        />
      }
      off={
        <DeprecatedTabs
          className={classNames('', {}, [className])}
          tabs={typeTabs}
          value={value}
          onTabClick={onTabClick}
        />
      }
    />
  );
};
