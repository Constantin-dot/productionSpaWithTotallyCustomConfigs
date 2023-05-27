import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { ProfileCard } from 'entities/Profile';
import { CurrencyEnum } from 'entities/Currency';
import { CountryEnum } from 'entities/Country';
import { useParams } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextVariantEnum } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersListType } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import cls from './EditableProfileCard.module.scss';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { ProfileValidateErrorEnum } from '../../model/types/EditableProfileCardSchema';

const reducers: ReducersListType = {
  profile: profileReducer,
};

interface EditableProfileCardProps {
  className?: string;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { className } = props;
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const validateErrors = useSelector(getProfileValidateErrors);
  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);

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

  const validateErrorTranslates = {
    [ProfileValidateErrorEnum.INCORRECT_USER_DATA]: t('incorrect_user_data'),
    [ProfileValidateErrorEnum.INCORRECT_AGE]: t('incorrect_age'),
    [ProfileValidateErrorEnum.INCORRECT_COUNTRY]: t('incorrect_country'),
    [ProfileValidateErrorEnum.NO_DATA]: t('no_data'),
    [ProfileValidateErrorEnum.SERVER_ERROR]: t('server_error'),
  };

  useInitialEffect(() => {
    dispatch(fetchProfileData(id));
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.EditableProfileCard, {}, [className])}>
        {validateErrors?.length && validateErrors.map((err: ProfileValidateErrorEnum) => (
          <Text
            variant={TextVariantEnum.ERROR}
            text={validateErrorTranslates[err]}
            key={err}
          />
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
