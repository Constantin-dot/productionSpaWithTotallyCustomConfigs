import { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { ThemeSwticher } from 'shared/ui/ThemeSwitcher/ThemeSwticher';
import cls from './Sidebar.module.scss';
import { SidebarItemList } from '../../model/items';
import { SidebarItem } from '../SidebarItem/SidebarItem';

type PropsType = { className?: string, };

export const Sidebar = memo((props: PropsType) => {
  const { className } = props;

  const [collapsed, setCollapsed] = useState(false);

  const onToggleHandler = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      data-testid="sidebar"
      className={classNames(
        cls.Sidebar,
        { [cls.collapsed]: collapsed },

        [className],
      )}
    >
      <div className={cls.items}>
        {SidebarItemList.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            collapsed={collapsed}
          />
        ))}
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
    </div>
  );
});
