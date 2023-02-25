import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

type PropsType = {className?: string,};

export const LoginForm: FC<PropsType> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input placeholder={t('loginPlaceholder')} autoFocus className={cls.input} />
      <Input placeholder={t('passwordPlaceholder')} className={cls.input} />
      <Button className={cls.loginBtn}>{t('signIn')}</Button>
    </div>
  );
};
