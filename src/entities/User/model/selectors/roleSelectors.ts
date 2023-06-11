import { createSelector } from '@reduxjs/toolkit';
import { IStateSchema } from '@/app/providers/StoreProvider';

export const getUserRole = (state: IStateSchema) => state.user.authData?.role;

export const isUserAdmin = createSelector(getUserRole, (role) => Boolean(role?.includes('ADMIN')));
export const isUserManager = createSelector(getUserRole, (role) => Boolean(role?.includes('MANAGER')));
