import { RouteProps } from 'react-router-dom';
import { UserRoleVariant } from '@/entities/User';

export type AppRoutesPropsType = RouteProps & {
  authOnly?: boolean,
  role?: Array<UserRoleVariant>,
}
