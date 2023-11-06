import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CountryEnum, CountrySelect } from '@/entities/Country';
import { CurrencyEnum, CurrencySelect } from '@/entities/Currency';
import { classNames, ModsType } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader';
import { Text, TextAlignEnum, TextVariantEnum } from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { IProfile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

type PropsType = {
  className?: string;
  data?: IProfile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onFirstnameChangeHandler?: (value: string | number) => void;
  onLastnameChangeHandler?: (value: string | number) => void;
  onAgeChangeHandler?: (value: string | number) => void;
  onCityChangeHandler?: (value: string | number) => void;
  onUsernameChangeHandler?: (value: string | number) => void;
  onAvatarChangeHandler?: (value: string | number) => void;
  onCurrencyChangeHandler?: (value: CurrencyEnum) => void;
  onCountryChangeHandler?: (value: CountryEnum) => void;
};

export const ProfileCard: FC<PropsType> = (props) => {
  const {
    className,
    data,
    isLoading,
    error,
    readonly,
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
    return (
      <HStack
        justify="center"
        max
        className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
      >
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack
        justify="center"
        max
        className={classNames(cls.ProfileCard, {}, [className, cls.error])}
      >
        <Text
          variant={TextVariantEnum.ERROR}
          title={t('error')}
          text={t('errorTip')}
          align={TextAlignEnum.CENTER}
        />
      </HStack>
    );
  }

  return (
    <VStack
      gap="16"
      align="start"
      max
      className={classNames(cls.ProfileCard, mods, [className])}
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
