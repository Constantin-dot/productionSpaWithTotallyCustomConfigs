import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { IUser } from '../types/user';
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localstorage';

export const initAuthData = createAsyncThunk<IUser, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (_, { dispatch, rejectWithValue }) => {
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    if (!userId) {
      return rejectWithValue('Has not current user ID!');
    }

    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      return response;
    } catch (error) {
      return rejectWithValue('Something went wrong!');
    }
  },
);
