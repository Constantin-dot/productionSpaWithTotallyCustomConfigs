import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IProfile } from '@/entities/Profile';

export const fetchProfileData = createAsyncThunk<
  IProfile,
  string | undefined,
  ThunkConfig<string>
>('profile/fetchProfileData', async (profileId, { extra, rejectWithValue }) => {
  if (!profileId) {
    rejectWithValue('Error!Have not profile id.');
  }

  try {
    const response = await extra.api.get(`/profile/${profileId}`);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (error) {
    return rejectWithValue('Something went wrong!');
  }
});
