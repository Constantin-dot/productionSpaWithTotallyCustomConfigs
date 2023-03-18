import { CountryEnum, CountrySelect } from 'entities/Country';
import { CurrencyEnum, CurrencySelect } from 'entities/Currency';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames, ModsType } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
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
  onFirstnameChangeHandler?: (value: string | number) => void,
  onLastnameChangeHandler?: (value: string | number) => void,
  onAgeChangeHandler?: (value: string | number) => void,
  onCityChangeHandler?: (value: string | number) => void,
  onUsernameChangeHandler?: (value: string | number) => void,
  onAvatarChangeHandler?: (value: string | number) => void,
  onCurrencyChangeHandler?: (value: CurrencyEnum) => void,
  onCountryChangeHandler?: (value: CountryEnum) => void,
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
    onCurrencyChangeHandler,
    onCountryChangeHandler,
  } = props;
  const { t } = useTranslation('profile');
  const readonly = useSelector(getProfileReadonly);

  const mods: ModsType = {
    [cls.editing]: !readonly,
  };

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
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar src={data.avatar} alt={`${data.username} avatar`} size={100} />
          </div>
        )}
        <div className={cls.infoBlock}>
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
            elipsis
            width="250px"
          />
          <CurrencySelect
            className={cls.select}
            label={t('currencyPlaceholder')}
            readonly={readonly}
            value={data?.currency}
            onChange={onCurrencyChangeHandler}
          />
          <CountrySelect
            className={cls.select}
            label={t('countryPlaceholder')}
            readonly={readonly}
            value={data?.country}
            onChange={onCountryChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};
