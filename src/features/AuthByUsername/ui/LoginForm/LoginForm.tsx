import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonVariantEnum } from '@/shared/ui/Button/Button';
import { Input, InputVariantEnum } from '@/shared/ui/Input/Input';
import { Text, TextVariantEnum } from '@/shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersListType } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export type LoginFormPropsType = {
  className?: string,
  onSuccessHandler: () => void,
};

const initialReducers: ReducersListType = {
  loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormPropsType) => {
  const {
    className,
    onSuccessHandler,
  } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);

  const onUsernameChangeHandler = useCallback((value: string | number) => {
    dispatch(loginActions.setUsername(value.toString()));
  }, [dispatch]);

  const onPasswordChangeHandler = useCallback((value: string | number) => {
    dispatch(loginActions.setPassword(value.toString()));
  }, [dispatch]);

  const onLoginBtnClickHandler = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccessHandler();
    }
  }, [dispatch, username, password, onSuccessHandler]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <p className={cls.header}>{t('authorizationModalTitle')}</p>
        {error && <Text text={t('authErrorMessage')} variant={TextVariantEnum.ERROR} />}
        <Input
          placeholder={t('loginPlaceholder') ?? ''}
          autoFocus
          className={cls.input}
          variant={InputVariantEnum.INVERTED}
          onChange={onUsernameChangeHandler}
          value={username}
        />
        <Input
          placeholder={t('passwordPlaceholder') ?? ''}
          className={cls.input}
          variant={InputVariantEnum.INVERTED}
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
    </DynamicModuleLoader>
  );
});

export default LoginForm;
