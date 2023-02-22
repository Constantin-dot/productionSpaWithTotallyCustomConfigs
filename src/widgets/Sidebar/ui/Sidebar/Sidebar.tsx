import { FC, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { ThemeSwticher } from 'shared/ui/ThemeSwitcher/ThemeSwticher';
import { AppLink, AppLinkVariantEnum } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/home.svg';
import MainIcon from 'shared/assets/icons/list.svg';
import cls from './Sidebar.module.scss';

type PropsType = { className?: string, };

export const Sidebar: FC<PropsType> = (props) => {
  const { className } = props;

  const { t } = useTranslation();

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
        <AppLink
          variant={AppLinkVariantEnum.SECONDARY}
          to={RoutePath.main}
          className={cls.item}
        >
          <MainIcon className={cls.icon} />
          <span className={cls.link}>{t('main')}</span>
        </AppLink>
        <AppLink
          variant={AppLinkVariantEnum.SECONDARY}
          to={RoutePath.about}
          className={cls.item}
        >
          <AboutIcon className={cls.icon} />
          <span className={cls.link}>{t('about')}</span>
        </AppLink>
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
};
