import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localstorage';
import { IUser, IUserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';

const initialState: IUserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IUser>) => {
      state.authData = action.payload;
      setFeatureFlags(action.payload.features);
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (user) {
        const json = JSON.parse(user) as IUser;
        state.authData = json;
        setFeatureFlags(json.features);
      }
      state._inited = true;
    },
    logoutUser: (state) => {
      state.authData = undefined;
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      setFeatureFlags(undefined);
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
