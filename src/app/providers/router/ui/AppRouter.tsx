import {
  FC, memo, Suspense, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesPropsType, routeConfig } from '@/shared/config/routeConfig/routeConfig';
import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

const AppRouter: FC = () => {
  const renderWithWrapper = useCallback((route: AppRoutesPropsType) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        {route.element}
      </Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? <RequireAuth role={route.role}>{element}</RequireAuth> : element}
      />
    );
  }, []);

  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  );
};

export default memo(AppRouter);
