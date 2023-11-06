import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IUser, userActions } from '@/entities/User';
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localstorage';

interface ILoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  IUser,
  ILoginByUsernameProps,
  ThunkConfig<string>
>(
  'login/loginByUsername',
  async (authData, { dispatch, extra, rejectWithValue }) => {
    try {
      const response = await extra.api.post('/login', authData);

      if (!response.data) {
        throw new Error();
      }

      localStorage.setItem(
        LOCAL_STORAGE_USER_KEY,
        JSON.stringify(response.data),
      );
      dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue('Entered incorrect date!');
    }
  },
);
