import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from 'features/EditableProfileCard';
import { getUserAuthData } from 'entities/User';
import { HStack } from 'shared/ui/Stack';

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
    <HStack justify="between" max className={classNames('', {}, [className])}>
      <Text title={t('title')} />
      {canEdit && (
        <div>
          {readonly ? (
            <Button
              variant={ButtonVariantEnum.OUTLINE}
              onClick={onEditHandler}
            >
              {t('editBtn')}
            </Button>
          ) : (
            <HStack gap="8">
              <Button
                variant={ButtonVariantEnum.OUTLINE_RED}
                onClick={onCancelHandler}
              >
                {t('cancelBtn')}
              </Button>
              <Button
                variant={ButtonVariantEnum.OUTLINE}
                onClick={onSaveHandler}
              >
                {t('saveBtn')}
              </Button>
            </HStack>
          ) }
        </div>
      )}
    </HStack>
  );
});
