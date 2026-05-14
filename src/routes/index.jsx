import React, { lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AppRoute from "./route";
import Layout from "../containers/Layout";

// Page Imports
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

const publicRoutes = [
  { path: "/", exact: true, component: HomePage },
  { path: "/login", exact: true, component: LoginPage },
  { path: "/help", exact: true, component: HelpCenterPage },
  { path: "/privacy", exact: true, component: PrivacyPolicyPage },
  { path: "/terms", exact: true, component: TermsOfServicePage },
];

const privateRoutes = [
  { path: "/portal", exact: true, component: StudentPortalPage },
  { path: "/read/:id", exact: true, component: ReaderPage },
  { path: "/resources", exact: true, component: ResourcesPage },
  { path: "/support", exact: true, component: SupportPage },
  { path: "/faq", exact: true, component: FAQPage },
  { path: "/category/:type/:name", exact: true, component: CategoryViewPage },
];

const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes WITHOUT Layout (Full Screen) */}
      <Route
        path="/login"
        element={<AppRoute component={LoginPage} isAuthProtected={false} />}
      />
      <Route
        path="/read/:id"
        element={<AppRoute component={ReaderPage} isAuthProtected={true} />}
      />

      {/* Routes WITH Layout */}
      <Route element={<LayoutWrapper />}>
        {/* Public with Layout */}
        <Route
          path="/"
          element={<AppRoute component={HomePage} isAuthProtected={false} />}
        />
        <Route
          path="/help"
          element={<AppRoute component={HelpCenterPage} isAuthProtected={false} />}
        />
        <Route
          path="/privacy"
          element={<AppRoute component={PrivacyPolicyPage} isAuthProtected={false} />}
        />
        <Route
          path="/terms"
          element={<AppRoute component={TermsOfServicePage} isAuthProtected={false} />}
        />

        {/* Private with Layout */}
        <Route
          path="/portal"
          element={<AppRoute component={StudentPortalPage} isAuthProtected={true} />}
        />
        <Route
          path="/resources"
          element={<AppRoute component={ResourcesPage} isAuthProtected={true} />}
        />
        <Route
          path="/support"
          element={<AppRoute component={SupportPage} isAuthProtected={true} />}
        />
        <Route
          path="/faq"
          element={<AppRoute component={FAQPage} isAuthProtected={true} />}
        />
        <Route
          path="/category/:type/:name"
          element={<AppRoute component={CategoryViewPage} isAuthProtected={true} />}
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
