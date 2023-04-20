import { memo, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { ThemeSwticher } from 'shared/ui/ThemeSwitcher/ThemeSwticher';
import { useSelector } from 'react-redux';
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
    <menu
      data-testid="sidebar"
      className={classNames(
        cls.Sidebar,
        { [cls.collapsed]: collapsed },

        [className],
      )}
    >
      <div className={cls.items}>
        {itemsList}
      </div>
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
    </menu>
  );
});
