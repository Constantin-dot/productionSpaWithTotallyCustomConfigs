import { IFeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from './setGetFeatures';

interface IToggleFeaturesOptions<T> {
  name: keyof IFeatureFlags;
  on: () => T;
  off: () => T;
}

export function toggleFeatures<T>({
  off,
  on,
  name,
}: IToggleFeaturesOptions<T>): T {
  if (getFeatureFlag(name)) {
    return on();
  }

  return off();
}
