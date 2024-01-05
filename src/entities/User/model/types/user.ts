import { IFeatureFlags } from '@/shared/types/featureFlags';
import { IJsonSettings } from './jsonSettings';

export type UserRoleVariant = 'ADMIN' | 'MANAGER' | 'USER';
export interface IUser {
  id: string;
  username: string;
  avatar?: string;
  role: Array<UserRoleVariant>;
  features?: IFeatureFlags;
  jsonSettings?: IJsonSettings;
}

export interface IUserSchema {
  authData?: IUser;

  _inited: boolean;
}
