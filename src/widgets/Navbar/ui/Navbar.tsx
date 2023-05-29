import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkVariantEnum } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';
import { Text, TextVariantEnum } from 'shared/ui/Text/Text';
import { DropdownMenu } from 'shared/ui/DropdownMenu/DropdownMenu';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import cls from './Navbar.module.scss';

interface INavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: INavbarProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const isAdminPanelAvailable = isAdmin || isManager;

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const onLogoutHandler = useCallback(() => {
    dispatch(userActions.logoutUser());
  }, [dispatch]);

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          className={cls.appName}
          variant={TextVariantEnum.INVERTED}
          title="Test App"
        />
        <AppLink
          className={cls.createLink}
          to={RoutePath.article_create}
          variant={AppLinkVariantEnum.SECONDARY}
        >
          <Button
            variant={ButtonVariantEnum.CLEAR_INVERTED}
            className={cls.links}
          >
            {t('createArticle')}
          </Button>
        </AppLink>
        <DropdownMenu
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
          className={cls.dropdownMenu}
          direction="bottomLeft"
        />
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>

      <Button
        variant={ButtonVariantEnum.CLEAR_INVERTED}
        className={cls.links}
        onClick={onOpenModal}
      >
        {t('signIn')}
      </Button>
      {isAuthModalOpen && (
        <LoginModal
          isOpen={isAuthModalOpen}
          onClose={onCloseModal}
        />
      )}
    </header>
  );
});
