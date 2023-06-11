import { FC, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardVariantEnum } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface ITabItem {
  value: string;
  content: ReactNode;
}

type PropsType = {
  className?: string,
  tabs: ITabItem[],
  value: string,
  onTabClick: (tab: ITabItem) => void;
};

export const Tabs: FC<PropsType> = (props) => {
  const {
    className,
    tabs,
    value,
    onTabClick,
  } = props;

  const onTabClickHandler = useCallback((tab: ITabItem) => () => {
    onTabClick(tab);
  }, [onTabClick]);

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          variant={tab.value === value ? CardVariantEnum.NORMAL : CardVariantEnum.OUTLINED}
          className={cls.tab}
          onClick={onTabClickHandler(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
};
