import React, { Suspense, lazy } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import AuthGuard from "../guards/AuthGuard";
import LoadingScreen from "../components/LoadingScreen";
import GuestGuard from "../guards/GuestGuard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
import DashboardLayout from "../layouts/dashboard";
// import NotFound from "../pages/not_found";

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) => {
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: <GuestGuard>{/* <Register /> */}</GuestGuard>,
        },
        { path: "login-unprotected", element: <Login /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: "", element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <GeneralApp /> },
        { path: "nphcda", element: <NPHCDADashboard /> },
        {
          path: "m-and-e",

          children: [
            // { path: '/', element: <Navigate to="/m-and-e/state" replace /> },
            { path: "state", element: <StatePage /> },
            { path: "lga", element: <LGAPage /> },
            { path: "hf", element: <HFPage /> },
            { path: "view-assessment", element: <ViewQuarter /> },
            { path: "view-state-assessment", element: <ViewQuarterState /> },
            { path: "view-hf-assessment", element: <ViewHFQuarter /> },
            { path: "new-assessment", element: <NewAssessmentForm /> },
            { path: "new-assessment-lga", element: <NewAssessmentFormLGA /> },
            { path: "new-assessment-hf", element: <NewAssessmentFormHF /> },
            { path: "progress-report/:state?/:lga?", element: <Progress /> },
          ],
        },
        {
          path: "financial_management",

          children: [
            { path: "dashboard", element: <FinanceDashboard /> },
            { path: "business_plan/:state?/:lga?", element: <BusinessPlan /> },
            { path: "retirement", element: <FinanceRetirement /> },
            { path: "viewLgaPlan/:facility", element: <FacilityPlan /> },
            { path: "viewRetirement", element: <ViewRetirement /> },
           
          ],
        },
        {
          path: "settings",
          children: [
            { path: "user", element: <UserManagement /> },
            { path: "facility", element: <FacilityManagement /> },
            { path: "questions", element: <QuestionsSettings /> },
            { path: "moc-kpi", element: <MocKPI /> },
            { path: "wards", element: <WardSettings /> },
           
          ],
        },
      ],
    },
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "500", element: <Page500 /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
    { path: "/", element: <Navigate to="/dashboard/app" replace /> },
  ]);
}

const Login = Loadable(lazy(() => import("../pages/authentication/login")));
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/general_app"))
);
const NPHCDADashboard = Loadable(
  lazy(() => import("../pages/dashboard/nphcda-dashboard"))
);
const StatePage = Loadable(lazy(() => import("../pages/dashboard/state")));
const LGAPage = Loadable(lazy(() => import("../pages/dashboard/lga")));
const HFPage = Loadable(lazy(() => import("../pages/dashboard/hf")));
const ViewQuarter = Loadable(
  lazy(() => import("../pages/dashboard/viewQuarter"))
);
const ViewQuarterState = Loadable(
  lazy(() => import("../pages/dashboard/viewQuarterState"))
);
const ViewHFQuarter = Loadable(
  lazy(() => import("../pages/dashboard/ViewHfQuarter"))
);
const NewAssessmentForm = Loadable(
  lazy(() => import("../pages/dashboard/components/new_assessment"))
);
const NewAssessmentFormLGA = Loadable(
  lazy(() => import("../pages/dashboard/components/new_assessment_lga"))
);
const NewAssessmentFormHF = Loadable(
  lazy(() => import("../pages/dashboard/components/new_assessment_hf"))
);
const UserManagement = Loadable(
  lazy(() => import("../pages/settings/userManagement"))
);
const FacilityManagement = Loadable(
  lazy(() => import("../pages/settings/facilityManagement"))
);
const QuestionsSettings = Loadable(
  lazy(() => import("../pages/settings/questionsSettings"))
);
const MocKPI = Loadable(
  lazy(() => import("../pages/settings/MocKPI"))
);
const WardSettings = Loadable(
  lazy(() => import("../pages/settings/wardSettings"))
);
const FinanceDashboard = Loadable(
  lazy(() => import("../pages/dashboard/finance/dashboard"))
);
const BusinessPlan = Loadable(
  lazy(() => import("../pages/dashboard/finance/business_plan"))
);
const FinanceRetirement = Loadable(
  lazy(() => import("../pages/dashboard/finance/retirement"))
);
const FacilityPlan = Loadable(
  lazy(() => import("../pages/dashboard/finance/components/facilityPlan"))
);
const ViewRetirement = Loadable(
  lazy(() => import("../pages/dashboard/finance/components/viewRetirement"))
);
const Progress = Loadable(
  lazy(() => import("../pages/dashboard/reports/progress"))
);
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
// const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
