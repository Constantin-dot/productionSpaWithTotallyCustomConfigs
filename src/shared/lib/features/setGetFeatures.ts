import { IFeatureFlags } from '@/shared/types/featureFlags';

let featureFlags: IFeatureFlags | undefined;

export function setFeatureFlags(newFeatureFlags?: IFeatureFlags) {
  featureFlags = newFeatureFlags;
}

export function getFeatrueFlag(flag: keyof IFeatureFlags) {
  return featureFlags?.[flag];
}
