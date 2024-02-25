import { FC } from 'react';
import { CountryEnum } from '@/entities/Country';
import { CurrencyEnum } from '@/entities/Currency';
import { IProfile } from '../../model/types/profile';
import { ToggleFeatures } from '@/shared/lib/features';
import { DeprecatedProfileCard } from '../DeprecatedProfileCard/DeprecatedProfileCard';
import { RedesignedProfileCard } from '../RedesignedProfileCard/RedesignedProfileCard';

export type TProfileCardProps = {
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

export const ProfileCard: FC<TProfileCardProps> = (props) => (
  <ToggleFeatures
    feature="isAppRedisigned"
    on={<RedesignedProfileCard {...props} />}
    off={<DeprecatedProfileCard {...props} />}
  />
);
