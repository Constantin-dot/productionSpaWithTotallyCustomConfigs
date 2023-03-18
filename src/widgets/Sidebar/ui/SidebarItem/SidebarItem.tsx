import { getUserAuthData } from 'entities/User';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkVariantEnum } from 'shared/ui/AppLink/AppLink';
import { ISidebarItem } from '../../model/items';
import cls from './SidebarItem.module.scss';

type PropsType = {
  item: ISidebarItem,
  collapsed: boolean,
};

export const SidebarItem = memo((props: PropsType) => {
  const { t } = useTranslation();
  const {
    item,
    collapsed,
  } = props;

  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      variant={AppLinkVariantEnum.SECONDARY}
      to={item.path}
      className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
    >
      <item.Icon className={cls.icon} />
      <span className={cls.link}>{t(item.text)}</span>
    </AppLink>
  );
});
