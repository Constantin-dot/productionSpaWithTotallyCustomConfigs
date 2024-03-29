import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import { Button, ButtonVariantEnum } from '@/shared/ui/deprecated/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { HStack } from '@/shared/ui/redesigned/Stack';

type PropsType = { className?: string };

export const EditableProfileCardHeader = memo((props: PropsType) => {
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
              data-testid="EditableProfileCardHeader.EditButton"
            >
              {t('editBtn')}
            </Button>
          ) : (
            <HStack gap="8">
              <Button
                variant={ButtonVariantEnum.OUTLINE_RED}
                onClick={onCancelHandler}
                data-testid="EditableProfileCardHeader.CancelButton"
              >
                {t('cancelBtn')}
              </Button>
              <Button
                variant={ButtonVariantEnum.OUTLINE}
                onClick={onSaveHandler}
                data-testid="EditableProfileCardHeader.SaveButton"
              >
                {t('saveBtn')}
              </Button>
            </HStack>
          )}
        </div>
      )}
    </HStack>
  );
});
