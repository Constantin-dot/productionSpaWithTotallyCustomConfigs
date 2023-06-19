import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonVariantEnum } from '@/shared/ui/Button';
import { ThemeSwticher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { VStack } from '@/shared/ui/Stack';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';

type PropsType = { className?: string, };

export const Sidebar = memo((props: PropsType) => {
  const { className } = props;
  const sidebarItemsList = useSelector(getSidebarItems);
  const [collapsed, setCollapsed] = useState(false);

  const onToggleHandler = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(() => sidebarItemsList.map((item) => (
    <SidebarItem
      key={item.path}
      item={item}
      collapsed={collapsed}
    />
  )), [collapsed, sidebarItemsList]);

  return (
    <aside
      data-testid="sidebar"
      className={classNames(
        cls.Sidebar,
        { [cls.collapsed]: collapsed },

        [className],
      )}
    >
      <VStack role="navigation" gap="8" align="start" className={cls.items}>
        {itemsList}
      </VStack>
      <div className={cls.switchers}>
        <ThemeSwticher />
        <LangSwitcher />
        <Button
          data-testid="sidebar-toggle"
          onClick={onToggleHandler}
          className={cls.coolapsingBtn}
          isSquare
          variant={ButtonVariantEnum.INVERTED_BACKGROUND}
        >
          {collapsed ? '>' : '<'}
        </Button>
      </div>
    </aside>
  );
});
