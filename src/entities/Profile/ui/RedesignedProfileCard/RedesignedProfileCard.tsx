import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TProfileCardProps } from '../ProfileCard/ProfileCard';
import { Card } from '@/shared/ui/redesigned/Card';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

const RedesignedProfileCardSkeleton: FC = () => (
  <Card padding="24" max>
    <VStack gap="32" max>
      <HStack justify="center" max>
        <Skeleton width={128} height={128} border="100%" />
      </HStack>

      <HStack gap="24" max>
        <VStack gap="16" max>
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
        </VStack>

        <VStack gap="16" max>
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
        </VStack>
      </HStack>
    </VStack>
  </Card>
);

const RedesignedProfileCardError: FC = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack justify="center" max>
      <Text
        variant="error"
        title={t('error')}
        text={t('errorTip')}
        align="center"
      />
    </HStack>
  );
};

export const RedesignedProfileCard: FC<TProfileCardProps> = (props) => {
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

  if (isLoading) {
    return <RedesignedProfileCardSkeleton />;
  }

  if (error) {
    return <RedesignedProfileCardError />;
  }

  return (
    <Card max padding="24" className={classNames('', {}, [className])}>
      <VStack gap="32">
        {data?.avatar && (
          <HStack justify="center" max>
            <Avatar
              src={data.avatar}
              alt={`${data.username} avatar`}
              size={128}
            />
          </HStack>
        )}
        <HStack gap="24" max>
          <VStack gap="16" max>
            <Input
              value={data?.firstname}
              label={t('firstnamePlaceholder') ?? ''}
              readonly={readonly}
              onChange={onFirstnameChangeHandler}
              data-testid="ProfileCard.firstname"
            />
            <Input
              value={data?.lastname}
              label={t('lastnamePlaceholder') ?? ''}
              readonly={readonly}
              onChange={onLastnameChangeHandler}
              data-testid="ProfileCard.lastname"
            />
            <Input
              value={data?.age}
              label={t('agePlaceholder') ?? ''}
              readonly={readonly}
              onChange={onAgeChangeHandler}
              data-testid="ProfileCard.age"
            />
            <Input
              value={data?.city}
              label={t('cityPlaceholder') ?? ''}
              readonly={readonly}
              onChange={onCityChangeHandler}
              data-testid="ProfileCard.city"
            />
          </VStack>
          <VStack gap="16" max align="start">
            <Input
              value={data?.username}
              label={t('usernamePlaceholder') ?? ''}
              readonly={readonly}
              onChange={onUsernameChangeHandler}
              data-testid="ProfileCard.username"
            />
            <Input
              value={data?.avatar}
              label={t('avatarPlaceholder') ?? ''}
              readonly={readonly}
              onChange={onAvatarChangeHandler}
              elipsis
              data-testid="ProfileCard.avatarPath"
            />
            <CurrencySelect
              label={t('currencyPlaceholder')}
              value={data?.currency}
              onChange={onCurrencyChangeHandler}
            />
            <CountrySelect
              label={t('countryPlaceholder')}
              value={data?.country}
              onChange={onCountryChangeHandler}
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};
