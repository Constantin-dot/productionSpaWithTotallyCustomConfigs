import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRoleVariant, getUserAuthData, getUserRole } from '@/entities/User';
import { getRouteForbiddenPage, getRouteMain } from '@/shared/const/router';

type PropsType = {
  children: JSX.Element;
  role?: Array<UserRoleVariant>;
};

export function RequireAuth({ children, role }: PropsType) {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRole);

  const hasRequiredRoles = useMemo(() => {
    if (!role) {
      return true;
    }
    return role?.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole);
      return hasRole;
    });
  }, [role, userRoles]);

  if (!auth) {
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return (
      <Navigate
        to={getRouteForbiddenPage()}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
