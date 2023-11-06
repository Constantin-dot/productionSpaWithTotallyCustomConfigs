export { userActions, userReducer } from './model/slice/userSlice';
export type { IUser, IUserSchema } from './model/types/user';
export type { UserRoleVariant } from './model/types/user';
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';
export {
  isUserAdmin,
  isUserManager,
  getUserRole,
} from './model/selectors/roleSelectors';
