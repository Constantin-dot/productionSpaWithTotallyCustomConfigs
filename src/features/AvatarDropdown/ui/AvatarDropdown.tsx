import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownMenu } from 'shared/ui/Popups';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { useSelector } from 'react-redux';
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

type PropsType = {
  className?: string,
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
        ...(isAdminPanelAvailable ? [{
          content: t('admin'),
          href: RoutePath.admin_panel,
        }] : []),
        {
          content: t('profile'),
          href: RoutePath.profile + authData.id,
        },
        {
          content: t('signOut'),
          onClick: onLogoutHandler,
        },
      ]}
      trigger={<Avatar size={30} src={authData.avatar ?? ''} alt="main dropdown menu" />}
      direction="bottomLeft"
    />
  );
});
