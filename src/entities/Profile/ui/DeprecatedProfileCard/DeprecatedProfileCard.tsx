import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CountrySelect } from '@/entities/Country';
import { ModsType, classNames } from '@/shared/lib/classNames/classNames';
import { CurrencySelect } from '@/entities/Currency';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Input } from '@/shared/ui/deprecated/Input';
import cls from './DeprecatedProfileCard.module.scss';
import { TProfileCardProps } from '../ProfileCard/ProfileCard';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
  Text,
  TextAlignEnum,
  TextVariantEnum,
} from '@/shared/ui/deprecated/Text';

const DeprecatedProfileCardSkeleton: FC = () => (
  <HStack
    justify="center"
    max
    className={classNames(cls.ProfileCard, {}, [cls.loading])}
  >
    <Loader />
  </HStack>
);

const DeprecatedProfileCardError: FC = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack
      justify="center"
      max
      className={classNames(cls.ProfileCard, {}, [cls.error])}
    >
      <Text
        variant={TextVariantEnum.ERROR}
        title={t('error')}
        text={t('errorTip')}
        align={TextAlignEnum.CENTER}
      />
    </HStack>
  );
};

export const DeprecatedProfileCard: FC<TProfileCardProps> = (props) => {
  const {
    className,
    data,
    readonly,
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

  const mods: ModsType = {
    [cls.editing]: !readonly,
  };

  if (isLoading) {
    return <DeprecatedProfileCardSkeleton />;
  }

  if (error) {
    return <DeprecatedProfileCardError />;
  }

  return (
    <VStack
      gap="16"
      align="start"
      max
      className={classNames(cls.DeprecatedProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify="center" max>
          <Avatar
            src={data.avatar}
            alt={`${data.username} avatar`}
            size={100}
          />
        </HStack>
      )}
      <Input
        className={cls.input}
        value={data?.firstname}
        placeholder={t('firstnamePlaceholder') ?? ''}
        readonly={readonly}
        onChange={onFirstnameChangeHandler}
        data-testid="ProfileCard.firstname"
      />
      <Input
        className={cls.input}
        value={data?.lastname}
        placeholder={t('lastnamePlaceholder') ?? ''}
        readonly={readonly}
        onChange={onLastnameChangeHandler}
        data-testid="ProfileCard.lastname"
      />
      <Input
        className={cls.input}
        value={data?.age}
        placeholder={t('agePlaceholder') ?? ''}
        readonly={readonly}
        onChange={onAgeChangeHandler}
        data-testid="ProfileCard.age"
      />
      <Input
        className={cls.input}
        value={data?.city}
        placeholder={t('cityPlaceholder') ?? ''}
        readonly={readonly}
        onChange={onCityChangeHandler}
        data-testid="ProfileCard.city"
      />
      <Input
        className={cls.input}
        value={data?.username}
        placeholder={t('usernamePlaceholder') ?? ''}
        readonly={readonly}
        onChange={onUsernameChangeHandler}
        data-testid="ProfileCard.username"
      />
      <Input
        className={cls.input}
        value={data?.avatar}
        placeholder={t('avatarPlaceholder') ?? ''}
        readonly={readonly}
        onChange={onAvatarChangeHandler}
        elipsis
        width="250px"
        data-testid="ProfileCard.avatarPath"
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
    </VStack>
  );
};
