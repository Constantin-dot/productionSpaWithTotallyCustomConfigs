import { IFeatureFlags } from '@/shared/types/featureFlags';

export type UserRoleVariant = 'ADMIN' | 'MANAGER' | 'USER';
export interface IUser {
  id: string;
  username: string;
  avatar?: string;
  role: Array<UserRoleVariant>;
  features?: IFeatureFlags;
}

export interface IUserSchema {
  authData?: IUser;

  _inited: boolean;
}
