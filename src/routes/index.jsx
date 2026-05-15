import React, { lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AppRoute from "./route";
import Layout from "../containers/Layout";

const HomePage = lazy(() => import("../pages/HomePage"));
const ReaderPage = lazy(() => import("../pages/ReaderPage"));
const ResourcesPage = lazy(() => import("../pages/ResourcesPage"));
const SupportPage = lazy(() => import("../pages/SupportPage"));
const FAQPage = lazy(() => import("../pages/FAQPage"));
const CategoryViewPage = lazy(() => import("../pages/CategoryViewPage"));
const StudentPortalPage = lazy(() => import("../pages/StudentPortalPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const HelpCenterPage = lazy(() => import("../pages/HelpCenterPage"));
const PrivacyPolicyPage = lazy(() => import("../pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("../pages/TermsOfServicePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<AppRoute component={LoginPage} isAuthProtected={false} path="/login" />}
      />
      <Route element={<LayoutWrapper />}>
        <Route
          path="/"
          element={<AppRoute component={HomePage} isAuthProtected={false} path="/" />}
        />
        <Route
          path="/read/:id"
          element={<AppRoute component={ReaderPage} isAuthProtected={true} path="/read/:id" />}
        />
        <Route
          path="/help"
          element={<AppRoute component={HelpCenterPage} isAuthProtected={false} path="/help" />}
        />
        <Route
          path="/privacy"
          element={<AppRoute component={PrivacyPolicyPage} isAuthProtected={false} path="/privacy" />}
        />
        <Route
          path="/terms"
          element={<AppRoute component={TermsOfServicePage} isAuthProtected={false} path="/terms" />}
        />

        <Route
          path="/portal"
          element={<AppRoute component={StudentPortalPage} isAuthProtected={true} path="/portal" />}
        />
        <Route
          path="/resources"
          element={<AppRoute component={ResourcesPage} isAuthProtected={true} path="/resources" />}
        />
        <Route
          path="/support"
          element={<AppRoute component={SupportPage} isAuthProtected={true} path="/support" />}
        />
        <Route
          path="/faq"
          element={<AppRoute component={FAQPage} isAuthProtected={true} path="/faq" />}
        />
        <Route
          path="/category/:type/:name"
          element={<AppRoute component={CategoryViewPage} isAuthProtected={true} path="/category/:type/:name" />}
        />
        
        <Route path="*" element={<AppRoute component={NotFoundPage} isAuthProtected={false} path="*" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
