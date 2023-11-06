import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line constantin-dot-plugin/layer-imports-checker
import { UserRoleVariant } from '@/entities/User';

export type AppRoutesPropsType = RouteProps & {
  authOnly?: boolean;
  role?: Array<UserRoleVariant>;
};
