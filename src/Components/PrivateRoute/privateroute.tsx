// src/components/PrivateRoute.tsx
import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  // permisos requeridos para acceder a esta ruta
  requiredPermissions: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredPermissions, ...rest }) => {
  const userInfo = localStorage.getItem("userInfo");
  const user = userInfo ? JSON.parse(userInfo) : null;

  // Si el usuario no existe o no tiene los permisos requeridos, redirige
  if (!user || !requiredPermissions.every((perm: string) => user.permissions.includes(perm))) {
    return <Redirect to="/my-profile" />;
  }

  return <Route {...rest} />;
};

export default PrivateRoute;
