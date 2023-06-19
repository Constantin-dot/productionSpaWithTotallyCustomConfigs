import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkVariantEnum } from '@/shared/ui/AppLink';
import { ISidebarItem } from '../../model/types/sidebar';
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
      <div className={cls.iconWrapper}>
        <item.Icon className={cls.icon} />
      </div>
      <span className={cls.link}>{t(item.text)}</span>
    </AppLink>
  );
});
