import { FC, ReactElement } from 'react';
import { IFeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from '../setGetFeatures';

interface IToggleFeaturesProps {
  feature: keyof IFeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

export const ToggleFeatures: FC<IToggleFeaturesProps> = (props) => {
  const { off, on, feature } = props;

  if (getFeatureFlag(feature)) {
    return on;
  }

  return off;
};
