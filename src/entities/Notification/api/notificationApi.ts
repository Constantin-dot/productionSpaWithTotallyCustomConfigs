import { rtkApi } from '@/shared/api/rtkApi';
import type { INotification } from '../model/types/notification';

const notificationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Array<INotification>, null>({
      query: () => ({
        url: '/notifications',
      }),
    }),
  }),
});

export const useNotifications = notificationsApi.useGetNotificationsQuery;
