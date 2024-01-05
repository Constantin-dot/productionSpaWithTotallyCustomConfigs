import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IJsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<
  IJsonSettings,
  IJsonSettings,
  ThunkConfig<string>
>(
  'user/saveJsonSettings',
  async (newJsonSettings, { dispatch, rejectWithValue, getState }) => {
    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    if (!userData) {
      return rejectWithValue("Hasn't user data!");
    }

    try {
      const response = await dispatch(
        setJsonSettingsMutation({
          userId: userData.id,
          jsonSettings: {
            ...currentSettings,
            ...newJsonSettings,
          },
        }),
      ).unwrap();

      if (!response.jsonSettings) {
        return rejectWithValue("Backend couldn't save changes!");
      }

      return response.jsonSettings;
    } catch (error) {
      return rejectWithValue('Something went wrong!');
    }
  },
);
