import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';
import cls from './ProfileCard.module.scss';

type PropsType = {className?: string,};

export const ProfileCard: FC<PropsType> = (props) => {
  const { className } = props;
  const { t } = useTranslation('profile');
  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('title')} />
        <Button className={cls.editBtn} variant={ButtonVariantEnum.OUTLINE}>{t('editBtn')}</Button>
      </div>
      <div className={cls.data}>
        <Input className={cls.input} value={data?.firstname} placeholder={t('firstnamePlaceholder')} />
        <Input className={cls.input} value={data?.lastname} placeholder={t('lastnamePlaceholder')} />
      </div>
    </div>
  );
};
