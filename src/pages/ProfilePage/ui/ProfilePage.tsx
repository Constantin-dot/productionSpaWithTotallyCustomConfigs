import { CountryEnum } from 'entities/Country';
import { CurrencyEnum } from 'entities/Currency';
import {
  fetchProfileData,
  getProfileData,
  getProfileError,
  getProfileIsLoading,
  getProfileReadonly,
  getProfileValidateErrors,
  profileActions,
  ProfileCard,
  profileReducer,
} from 'entities/Profile';
import { ProfileValidateErrorEnum } from 'entities/Profile/model/types/profile';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersListType } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextVariantEnum } from 'shared/ui/Text/Text';
import cls from './ProfilePage.module.scss';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersListType = {
  profile: profileReducer,
};

type PropsType = {className?: string,};

const ProfilePage = memo((props: PropsType) => {
  const { className } = props;
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const validateErrors = useSelector(getProfileValidateErrors);
  const readonly = useSelector(getProfileReadonly);

  const validateErrorTranslates = {
    [ProfileValidateErrorEnum.INCORRECT_USER_DATA]: t('incorrect_user_data'),
    [ProfileValidateErrorEnum.INCORRECT_AGE]: t('incorrect_age'),
    [ProfileValidateErrorEnum.INCORRECT_COUNTRY]: t('incorrect_country'),
    [ProfileValidateErrorEnum.NO_DATA]: t('no_data'),
    [ProfileValidateErrorEnum.SERVER_ERROR]: t('server_error'),
  };

  const onFirstnameChangeHandler = useCallback((value: number | string) => {
    dispatch(profileActions.updateProfile({ firstname: value.toString() }));
  }, [dispatch]);

  const onLastnameChangeHandler = useCallback((value: number | string) => {
    dispatch(profileActions.updateProfile({ lastname: value.toString() }));
  }, [dispatch]);

  const onAgeChangeHandler = useCallback((value: number | string) => {
    dispatch(profileActions.updateProfile({ age: +value }));
  }, [dispatch]);

  const onCityChangeHandler = useCallback((value: number | string) => {
    dispatch(profileActions.updateProfile({ city: value.toString() }));
  }, [dispatch]);

  const onUsernameChangeHandler = useCallback((value: number | string) => {
    dispatch(profileActions.updateProfile({ username: value.toString() }));
  }, [dispatch]);

  const onAvatarChangeHandler = useCallback((value: number | string) => {
    dispatch(profileActions.updateProfile({ avatar: value.toString() }));
  }, [dispatch]);

  const onCurrencyChangeHandler = useCallback((value: CurrencyEnum) => {
    dispatch(profileActions.updateProfile({ currency: value }));
  }, [dispatch]);

  const onCountryChangeHandler = useCallback((value: CountryEnum) => {
    dispatch(profileActions.updateProfile({ country: value }));
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(fetchProfileData(id));
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ProfilePage, {}, [className])}>
        <ProfilePageHeader />
        {validateErrors?.length && validateErrors.map((err) => (
          <Text variant={TextVariantEnum.ERROR} text={validateErrorTranslates[err]} key={err} />
        ))}
        <ProfileCard
          data={data}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          onFirstnameChangeHandler={onFirstnameChangeHandler}
          onLastnameChangeHandler={onLastnameChangeHandler}
          onAgeChangeHandler={onAgeChangeHandler}
          onCityChangeHandler={onCityChangeHandler}
          onUsernameChangeHandler={onUsernameChangeHandler}
          onAvatarChangeHandler={onAvatarChangeHandler}
          onCurrencyChangeHandler={onCurrencyChangeHandler}
          onCountryChangeHandler={onCountryChangeHandler}
        />
      </div>
    </DynamicModuleLoader>
  );
});

export default ProfilePage;
