import { FC, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '../Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface ITabItem {
  value: string;
  content: ReactNode;
}

type PropsType = {
  className?: string;
  tabs: ITabItem[];
  value: string;
  onTabClick: (tab: ITabItem) => void;
  direction?: FlexDirection;
};

export const Tabs: FC<PropsType> = (props) => {
  const { className, tabs, value, onTabClick, direction = 'row' } = props;

  const onTabClickHandler = useCallback(
    (tab: ITabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Flex
      direction={direction}
      gap="8"
      align="start"
      className={classNames(cls.Tabs, {}, [className])}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;

        return (
          <Card
            key={tab.value}
            variant={isSelected ? 'light' : 'normal'}
            className={classNames(cls.tab, { [cls.selected]: isSelected }, [])}
            onClick={onTabClickHandler(tab)}
            border="round"
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
};
