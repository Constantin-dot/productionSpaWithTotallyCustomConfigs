import { getUserAuthData } from 'entities/User';
import { createSelector } from 'reselect';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/list.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticlesIcon from 'shared/assets/icons/doc.svg';
import { ISidebarItem } from '../types/sidebar';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemList: ISidebarItem[] = [
      {
        path: RoutePath.main,
        text: 'main',
        Icon: MainIcon,
      },
      {
        path: RoutePath.about,
        text: 'about',
        Icon: AboutIcon,
      },
    ];

    if (userData) {
      sidebarItemList.push(
        {
          path: `${RoutePath.profile}${userData?.id}`,
          text: 'profile',
          Icon: ProfileIcon,
          authOnly: true,
        },
        {
          path: RoutePath.articles,
          text: 'articles',
          Icon: ArticlesIcon,
          authOnly: true,
        },
      );
    }

    return sidebarItemList;
  },
);
