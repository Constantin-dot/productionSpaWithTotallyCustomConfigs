import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfileSchema } from '../types/profile';

const initialState: IProfileSchema = {
  isLoading: false,
  readonly: true,
  error: undefined,
  data: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // setAuthData: (state, action: PayloadAction<IUser>) => {
    //   state.authData = action.payload;
    // },
    // initAuthData: (state) => {
    //   const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    //   if (user) {
    //     state.authData = JSON.parse(user);
    //   }
    // },
    // logoutUser: (state) => {
    //   state.authData = undefined;
    //   localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    // },
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
