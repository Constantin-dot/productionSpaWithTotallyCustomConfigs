import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownMenu } from '@/shared/ui/deprecated/Popups';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

type PropsType = {
  className?: string;
};

export const AvatarDropdown = memo((props: PropsType) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const isAdminPanelAvailable = isAdmin || isManager;

  const onLogoutHandler = useCallback(() => {
    dispatch(userActions.logoutUser());
  }, [dispatch]);

  if (!authData) {
    return null;
  }

  const items = [
    ...(isAdminPanelAvailable
      ? [
          {
            content: t('admin'),
            href: getRouteAdminPanel(),
          },
        ]
      : []),
    {
      content: t('profile'),
      href: getRouteProfile(authData.id),
    },
    {
      content: t('signOut'),
      onClick: onLogoutHandler,
    },
  ];

  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={
        <Dropdown
          className={classNames('', {}, [className])}
          items={items}
          trigger={
            <Avatar
              size={40}
              src={authData.avatar ?? ''}
              alt="main dropdown menu"
            />
          }
          direction="bottomLeft"
        />
      }
      off={
        <DropdownMenu
          className={classNames('', {}, [className])}
          items={items}
          trigger={
            <AvatarDeprecated
              fallbackInverted
              size={30}
              src={authData.avatar ?? ''}
              alt="main dropdown menu"
            />
          }
          direction="bottomLeft"
        />
      }
    />
  );
});
