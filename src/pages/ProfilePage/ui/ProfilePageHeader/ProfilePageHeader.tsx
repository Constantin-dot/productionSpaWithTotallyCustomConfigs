import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile';
import { getUserAuthData } from 'entities/User';
import cls from './ProfilePageHeader.module.scss';

type PropsType = {className?: string,};

export const ProfilePageHeader = memo((props: PropsType) => {
  const { className } = props;
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;

  const onEditHandler = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelHandler = useCallback(() => {
    dispatch(profileActions.cancelEditMode());
  }, [dispatch]);

  const onSaveHandler = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('title')} />
      {canEdit && (
        <div className={cls.btnsWrapper}>
          {readonly ? (
            <Button
              className={cls.editBtn}
              variant={ButtonVariantEnum.OUTLINE}
              onClick={onEditHandler}
            >
              {t('editBtn')}
            </Button>
          ) : (
            <div className={cls.btnsBlock}>
              <Button
                variant={ButtonVariantEnum.OUTLINE_RED}
                onClick={onCancelHandler}
              >
                {t('cancelBtn')}
              </Button>
              <Button
                className={cls.saveBtn}
                variant={ButtonVariantEnum.OUTLINE}
                onClick={onSaveHandler}
              >
                {t('saveBtn')}
              </Button>
            </div>
          ) }
        </div>
      )}
    </div>
  );
});
