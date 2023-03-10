import { profileReducer } from 'entities/Profile';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersListType } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import cls from './ProfilePage.module.scss';

const reducers: ReducersListType = {
  profile: profileReducer,
};

type PropsType = {className?: string,};

const ProfilePage = memo((props: PropsType) => {
  const { className } = props;
  const { t } = useTranslation('profile');

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ProfilePage, {}, [className])}>
        {t('pageTitle')}
      </div>
    </DynamicModuleLoader>
  );
});

export default ProfilePage;
