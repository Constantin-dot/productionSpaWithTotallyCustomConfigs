import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkVariantEnum } from '@/shared/ui/deprecated/AppLink';
import { Button, ButtonVariantEnum } from '@/shared/ui/deprecated/Button';
import { Text, TextVariantEnum } from '@/shared/ui/deprecated/Text';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import cls from './Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';

interface INavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: INavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  if (authData) {
    return (
      <ToggleFeatures
        feature="isAppRedisigned"
        on={
          <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
            <HStack gap="16" className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classNames(cls.Navbar, {}, [className])}>
            <Text
              className={cls.appName}
              variant={TextVariantEnum.INVERTED}
              title="Test App"
            />
            <AppLink
              className={cls.createLink}
              to={getRouteArticleCreate()}
              variant={AppLinkVariantEnum.SECONDARY}
            >
              <Button
                variant={ButtonVariantEnum.CLEAR_INVERTED}
                className={cls.links}
              >
                {t('createArticle')}
              </Button>
            </AppLink>
            <HStack gap="16" className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
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
        <LoginModal isOpen={isAuthModalOpen} onClose={onCloseModal} />
      )}
    </header>
  );
});
