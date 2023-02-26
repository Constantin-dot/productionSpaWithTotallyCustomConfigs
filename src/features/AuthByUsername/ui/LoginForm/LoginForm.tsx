import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextVariantEnum } from 'shared/ui/Text/Text';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginState } from '../../model/selectors/getLoginState';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

type PropsType = {className?: string,};

export const LoginForm = memo((props: PropsType) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    username, password, error, isLoading,
  } = useSelector(getLoginState);

  const onUsernameChangeHandler = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onPasswordChangeHandler = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginBtnClickHandler = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, username, password]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t('authorizationModalTitle')} />
      {error && <Text text={t('authErrorMessage')} variant={TextVariantEnum.ERROR} />}
      <Input
        placeholder={t('loginPlaceholder')}
        autoFocus
        className={cls.input}
        onChange={onUsernameChangeHandler}
        value={username}
      />
      <Input
        placeholder={t('passwordPlaceholder')}
        className={cls.input}
        onChange={onPasswordChangeHandler}
        value={password}
      />
      <Button
        disabled={isLoading}
        className={cls.loginBtn}
        variant={ButtonVariantEnum.OUTLINE}
        onClick={onLoginBtnClickHandler}
      >
        {t('signIn')}
      </Button>
    </div>
  );
});
