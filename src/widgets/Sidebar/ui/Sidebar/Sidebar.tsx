import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonVariantEnum } from '@/shared/ui/deprecated/Button';
import { ThemeSwticher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { VStack } from '@/shared/ui/Stack';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow.svg';

type PropsType = { className?: string };

export const Sidebar = memo((props: PropsType) => {
  const { className } = props;
  const sidebarItemsList = useSelector(getSidebarItems);
  const [collapsed, setCollapsed] = useState(false);

  const onToggleHandler = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem key={item.path} item={item} collapsed={collapsed} />
      )),
    [collapsed, sidebarItemsList],
  );

  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={
        <aside
          data-testid="sidebar"
          className={classNames(
            cls.SidebarRedesigned,
            { [cls.collapsedRedesigned]: collapsed },
            [className],
          )}
        >
          <AppLogo className={cls.appLogo} size={collapsed ? 30 : 50} />
          <VStack role="navigation" gap="8" align="start" className={cls.items}>
            {itemsList}
          </VStack>
          <Icon
            data-testid="sidebar-toggle"
            onClick={onToggleHandler}
            clickable
            className={cls.coolapsingBtn}
            Svg={ArrowIcon}
          />
          <div className={cls.switchersRedesigned}>
            <ThemeSwticher />
            <LangSwitcher className={cls.language} />
          </div>
        </aside>
      }
      off={
        <aside
          data-testid="sidebar"
          className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
            className,
          ])}
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
      }
    />
  );
});
