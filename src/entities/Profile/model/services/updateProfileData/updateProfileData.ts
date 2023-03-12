import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileData } from '../../selectors/getProfileData/getProfileData';
import { IProfile } from '../../types/profile';

export const updateProfileData = createAsyncThunk<
  IProfile,
  void,
  ThunkConfig<string>
>(
  'profile/updateProfileData',
  async (_, { extra, rejectWithValue, getState }) => {
    const formData = getProfileData(getState());

    try {
      const response = await extra.api.put('/profile', formData);

      return response.data;
    } catch (error) {
      return rejectWithValue('Something went wrong!');
    }
  },
);
