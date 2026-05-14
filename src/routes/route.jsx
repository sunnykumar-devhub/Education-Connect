import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";

const AppRoute = ({
  component: Component,
  path,
  exact,
  isAuthProtected,
  ...rest
}) => {
  const token = localStorage.getItem("token");

  if (isAuthProtected && !token) {
    return <Navigate to="/login" />;
  }

  return (
    <Suspense fallback={<></>}>
      <Component {...rest} />
    </Suspense>
  );
};

export default AppRoute;
