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

  if (!isAuthProtected && token && path === "/login") {
    return <Navigate to="/portal" />;
  }

  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-slate-50"><div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
      <Component {...rest} />
    </Suspense>
  );
};

export default AppRoute;
