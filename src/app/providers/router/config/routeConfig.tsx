import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import {
  AppRoutes,
  getRouteAbout,
  getRouteAdminPanel,
  getRouteArticleCreate,
  getRouteArticleEdit,
  getRouteArticles,
  getRouteArticlesDetails,
  getRouteMain,
  getRouteProfile,
  getRouteForbiddenPage,
} from '@/shared/const/router';
import type { AppRoutesPropsType } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesPropsType> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: getRouteAbout(),
    element: <AboutPage />,
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(':id'),
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLES]: {
    path: getRouteArticles(),
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: getRouteArticlesDetails(':id'),
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: getRouteArticleCreate(),
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: getRouteArticleEdit(),
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: getRouteAdminPanel(),
    element: <AdminPanelPage />,
    authOnly: true,
    role: ['ADMIN', 'MANAGER'],
  },
  [AppRoutes.FORBIDDEN_PAGE]: {
    path: getRouteForbiddenPage(),
    element: <ForbiddenPage />,
    authOnly: false,
  },
  // last
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
};
