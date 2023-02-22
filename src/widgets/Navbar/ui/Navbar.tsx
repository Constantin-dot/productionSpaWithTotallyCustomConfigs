import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkVariantEnum } from 'shared/ui/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface INavbarProps {
  className?: string;
}

export const Navbar: FC<INavbarProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>

      <div className={cls.links}>
        <AppLink
          variant={AppLinkVariantEnum.SECONDARY}
          to="/"
          className={cls.mainLink}
        >
          {t('main')}
        </AppLink>
        <AppLink
          variant={AppLinkVariantEnum.SECONDARY}
          to="/about"
        >
          {t('about')}
        </AppLink>
      </div>
    </div>
  );
};
