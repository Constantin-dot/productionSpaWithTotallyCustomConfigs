import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownMenu } from '@/shared/ui/deprecated/Popups';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';

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

  return (
    <DropdownMenu
      className={classNames('', {}, [className])}
      items={[
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
      ]}
      trigger={
        <Avatar
          fallbackInverted
          size={30}
          src={authData.avatar ?? ''}
          alt="main dropdown menu"
        />
      }
      direction="bottomLeft"
    />
  );
});
