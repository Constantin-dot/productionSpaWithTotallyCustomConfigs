import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_USER_KEY } from 'shared/const/localstorage';
import { IUser, IUserSchema } from '../types/user';

const initialState: IUserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IUser>) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (user) {
        state.authData = JSON.parse(user);
      }
      state._inited = true;
    },
    logoutUser: (state) => {
      state.authData = undefined;
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
