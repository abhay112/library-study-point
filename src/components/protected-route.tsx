import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminOnly?: boolean;
  adminRoute?:boolean;
  admin?: boolean;
  user?:boolean;
  userOnly?:boolean;
  redirect?: string;
}

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminOnly,
  adminRoute,
  admin,
  user,
  userOnly,
  redirect = "/",
}: Props) => {
  console.log(isAuthenticated,adminRoute,adminOnly);
  if (!isAuthenticated) return <Navigate to={redirect} />;
  if (!isAuthenticated && adminRoute) return <Navigate to={redirect} />;
  if (adminOnly && !admin) return <Navigate to={redirect} />;
  if (userOnly && !user) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
