import { createSelector } from 'reselect';
import { getUserAuthData } from '@/entities/User';
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/list.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticlesIcon from '@/shared/assets/icons/doc.svg';
import { ISidebarItem } from '../types/sidebar';
import {
  getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from '@/shared/const/router';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemList: ISidebarItem[] = [
      {
        path: getRouteMain(),
        text: 'main',
        Icon: MainIcon,
      },
      {
        path: getRouteAbout(),
        text: 'about',
        Icon: AboutIcon,
      },
    ];

    if (userData) {
      sidebarItemList.push(
        {
          path: getRouteProfile(userData?.id),
          text: 'profile',
          Icon: ProfileIcon,
          authOnly: true,
        },
        {
          path: getRouteArticles(),
          text: 'articles',
          Icon: ArticlesIcon,
          authOnly: true,
        },
      );
    }

    return sidebarItemList;
  },
);
