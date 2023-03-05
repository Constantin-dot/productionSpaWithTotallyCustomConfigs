import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/home.svg';
import MainIcon from 'shared/assets/icons/list.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

export interface ISidebarItem {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const SidebarItemList: ISidebarItem[] = [
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
  {
    path: RoutePath.profile,
    text: 'profile',
    Icon: ProfileIcon,
  },
];
