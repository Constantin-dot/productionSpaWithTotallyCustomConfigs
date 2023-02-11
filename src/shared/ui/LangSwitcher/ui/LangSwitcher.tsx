import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButtonEnum } from 'shared/ui/Button';
import cls from './LangSwitcher.module.scss';

type PropsType = { className?: string, };

export const LangSwitcher: FC<PropsType> = (props) => {
  const { className } = props;
  const { t, i18n } = useTranslation();
  const languageToggleHandler = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      className={classNames(cls.LangSwitcher, {}, [className])}
      theme={ThemeButtonEnum.CLEAR}
      onClick={languageToggleHandler}
    >
      {t('language')}
    </Button>
  );
};