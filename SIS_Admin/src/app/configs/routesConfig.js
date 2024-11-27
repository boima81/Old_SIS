import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import dashboardsConfigs from "../main/dashboards/dashboardsConfigs";
import appsConfigs from "../main/apps/appsConfigs";
import pagesConfigs from "../main/pages/pagesConfigs";
import authRoleExamplesConfigs from "../main/auth/authRoleExamplesConfigs";
import CustomAppConfig from "./CustomRoute";
import FeesAppConfig from "../main/Fees/FeesAppConfig";
import PayFeesAppConfig from "../main/PayFees/PayFeesAppConfig";

import ForgotPasswordConfig from "../main/forgot-password/ForgotPasswordConfig";
import ResetPasswordConfig from "../main/reset-password/ResetPasswordConfig";
import AdmissionReportApp from "../main/admissionReport/AdmissionReportAppConfig";
import RegistrationReportApp from "../main/registrationReport/RegistrationReportAppConfig";
import PrivacyPolicyConfig from "../main/privacyPolicy/PrivacyPolicyConfig";
import ServiceConfig from "../main/service/ServiceConfig";
import FinanceReportApp from "../main/financeReport/FinanceReportAppConfig";
import AcademicsReportApp from "../main/academicsReport/AcademicsReportAppConfig";
import AdminReportApp from "../main/adminReport/AdminReportAppConfig";
import AgencyConfigApp from "../main/Agency/AgencyAppConfig";

const routeConfigs = [
  ...appsConfigs,
  ...dashboardsConfigs,
  ...pagesConfigs,
  ...authRoleExamplesConfigs,
  CustomAppConfig,
  FeesAppConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  ForgotPasswordConfig,
  ResetPasswordConfig,
  AdmissionReportApp,
  FinanceReportApp,
  AcademicsReportApp,
  AdminReportApp,
  RegistrationReportApp,
  PrivacyPolicyConfig,
  ServiceConfig,
  PayFeesAppConfig,
  AgencyConfigApp
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "*",
    element: <Navigate to="pages/error/404" />,
  },
];

export default routes;
