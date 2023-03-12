import {
  fetchProfileData, getProfileData, getProfileError, getProfileIsLoading, profileActions, ProfileCard, profileReducer,
} from 'entities/Profile';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersListType } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
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
  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  const onFirstnameChangeHandler = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ firstname: value }));
  }, [dispatch]);

  const onLastnameChangeHandler = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ lastname: value }));
  }, [dispatch]);

  const onAgeChangeHandler = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ age: value }));
  }, [dispatch]);

  const onCityChangeHandler = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ city: value }));
  }, [dispatch]);

  const onUsernameChangeHandler = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ username: value }));
  }, [dispatch]);

  const onAvatarChangeHandler = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ avatar: value }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ProfilePage, {}, [className])}>
        <ProfilePageHeader />
        <ProfileCard
          data={data}
          isLoading={isLoading}
          error={error}
          onFirstnameChangeHandler={onFirstnameChangeHandler}
          onLastnameChangeHandler={onLastnameChangeHandler}
          onAgeChangeHandler={onAgeChangeHandler}
          onCityChangeHandler={onCityChangeHandler}
          onUsernameChangeHandler={onUsernameChangeHandler}
          onAvatarChangeHandler={onAvatarChangeHandler}
        />
      </div>
    </DynamicModuleLoader>
  );
});

export default ProfilePage;
