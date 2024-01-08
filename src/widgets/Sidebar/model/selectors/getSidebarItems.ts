import { createSelector } from 'reselect';
import { getUserAuthData } from '@/entities/User';
import { ISidebarItem } from '../types/sidebar';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';
import MainIconDepricated from '@/shared/assets/icons/home.svg';
import AboutIconDepricated from '@/shared/assets/icons/list.svg';
import ProfileIconDepricated from '@/shared/assets/icons/profile.svg';
import ArticlesIconDepricated from '@/shared/assets/icons/doc.svg';
import { toggleFeatures } from '@/shared/lib/features';
import MainIcon from '@/shared/assets/icons/home-re.svg';
import AboutIcon from '@/shared/assets/icons/info.svg';
import ProfileIcon from '@/shared/assets/icons/avatar-re.svg';
import ArticlesIcon from '@/shared/assets/icons/paper.svg';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemList: ISidebarItem[] = [
    {
      path: getRouteMain(),
      text: 'main',
      Icon: toggleFeatures({
        name: 'isAppRedisigned',
        on: () => MainIcon,
        off: () => MainIconDepricated,
      }),
    },
    {
      path: getRouteAbout(),
      text: 'about',
      Icon: toggleFeatures({
        name: 'isAppRedisigned',
        on: () => AboutIcon,
        off: () => AboutIconDepricated,
      }),
    },
  ];

  if (userData) {
    sidebarItemList.push(
      {
        path: getRouteProfile(userData?.id),
        text: 'profile',
        Icon: toggleFeatures({
          name: 'isAppRedisigned',
          on: () => ProfileIcon,
          off: () => ProfileIconDepricated,
        }),
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        text: 'articles',
        Icon: toggleFeatures({
          name: 'isAppRedisigned',
          on: () => ArticlesIcon,
          off: () => ArticlesIconDepricated,
        }),
        authOnly: true,
      },
    );
  }

  return sidebarItemList;
});
