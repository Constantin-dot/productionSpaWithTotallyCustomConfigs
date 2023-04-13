import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileData } from '../../selectors/getProfileData/getProfileData';
import { IProfile, ProfileValidateErrorEnum } from '../../types/profile';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
  IProfile,
  void,
  ThunkConfig<ProfileValidateErrorEnum[]>
>(
  'profile/updateProfileData',
  async (_, { extra, rejectWithValue, getState }) => {
    const formData = getProfileData(getState());
    const errors = validateProfileData(formData);

    if (errors.length) {
      return rejectWithValue(errors);
    }

    try {
      const response = await extra.api.put(`/profile/${formData?.id}`, formData);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue([ProfileValidateErrorEnum.SERVER_ERROR]);
    }
  },
);
