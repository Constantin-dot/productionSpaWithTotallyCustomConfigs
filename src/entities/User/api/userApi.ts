import { rtkApi } from '@/shared/api/rtkApi';
import type { IUser } from '../model/types/user';
import type { IJsonSettings } from '../model/types/jsonSettings';

interface ISetJsonSettingsArgs {
  userId: string;
  jsonSettings: IJsonSettings;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setJsonSettings: build.mutation<IUser, ISetJsonSettingsArgs>({
      query: ({ userId, jsonSettings }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: {
          jsonSettings,
        },
      }),
    }),
  }),
});

export const setJsonSettingsMutation =
  userApi.endpoints.setJsonSettings.initiate;
