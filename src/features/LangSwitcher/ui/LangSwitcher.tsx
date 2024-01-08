import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  Button as DeprecatedButton,
  ButtonVariantEnum,
} from '@/shared/ui/deprecated/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

type PropsType = { className?: string };

export const LangSwitcher = memo((props: PropsType) => {
  const { className } = props;
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const languageToggleHandler = () => {
    const newLanguage = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLanguage);
    dispatch(saveJsonSettings({ language: newLanguage }));
  };

  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={
        <Button
          className={classNames('', {}, [className])}
          variant="clear"
          onClick={languageToggleHandler}
        >
          {t('language')}
        </Button>
      }
      off={
        <DeprecatedButton
          className={classNames('', {}, [className])}
          variant={ButtonVariantEnum.INVERTED_BACKGROUND}
          onClick={languageToggleHandler}
        >
          {t('language')}
        </DeprecatedButton>
      }
    />
  );
});
