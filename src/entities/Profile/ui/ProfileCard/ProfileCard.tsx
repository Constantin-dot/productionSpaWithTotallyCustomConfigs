import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlignEnum, TextVariantEnum } from 'shared/ui/Text/Text';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { IProfile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

type PropsType = {
  className?: string,
  data?: IProfile,
  isLoading?: boolean,
  error?: string,
  onFirstnameChangeHandler?: (value: string) => void,
  onLastnameChangeHandler?: (value: string) => void,
  onAgeChangeHandler?: (value: string) => void,
  onCityChangeHandler?: (value: string) => void,
  onUsernameChangeHandler?: (value: string) => void,
  onAvatarChangeHandler?: (value: string) => void,
};

export const ProfileCard: FC<PropsType> = (props) => {
  const {
    className,
    data,
    isLoading,
    error,
    onFirstnameChangeHandler,
    onLastnameChangeHandler,
    onAgeChangeHandler,
    onCityChangeHandler,
    onUsernameChangeHandler,
    onAvatarChangeHandler,
  } = props;
  const { t } = useTranslation('profile');
  const readonly = useSelector(getProfileReadonly);

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          variant={TextVariantEnum.ERROR}
          title={t('error')}
          text={t('errorTip')}
          align={TextAlignEnum.CENTER}
        />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.data}>
        {data?.avatar && <img src={data.avatar} alt={`${data.username} avatar`} />}
        <Input
          className={cls.input}
          value={data?.firstname}
          placeholder={t('firstnamePlaceholder')}
          readonly={readonly}
          onChange={onFirstnameChangeHandler}
        />
        <Input
          className={cls.input}
          value={data?.lastname}
          placeholder={t('lastnamePlaceholder')}
          readonly={readonly}
          onChange={onLastnameChangeHandler}
        />
        <Input
          className={cls.input}
          value={data?.age}
          placeholder={t('agePlaceholder')}
          readonly={readonly}
          onChange={onAgeChangeHandler}
        />
        <Input
          className={cls.input}
          value={data?.city}
          placeholder={t('cityPlaceholder')}
          readonly={readonly}
          onChange={onCityChangeHandler}
        />
        <Input
          className={cls.input}
          value={data?.username}
          placeholder={t('usernamePlaceholder')}
          readonly={readonly}
          onChange={onUsernameChangeHandler}
        />
        <Input
          className={cls.input}
          value={data?.avatar}
          placeholder={t('avatarPlaceholder')}
          readonly={readonly}
          onChange={onAvatarChangeHandler}
        />
      </div>
    </div>
  );
};
