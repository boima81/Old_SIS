import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { authRoles } from "src/app/auth";
import AppSetting from "../settings/appSetting/AppSettings";
import BankInfoSettings from "../settings/bankInfo/BankInfoSettings";
import Email from "../settings/email/Email";
import EmailForm from "../settings/email/EmailForm";
import AcademicsReport from "./reports/AcademicsReport";

const Users = lazy(() => import("../settings/users/Users"));
const User = lazy(() => import("../settings/user/User"));
const Roles = lazy(() => import("../settings/role/Role"));

const AcademicsReportApp = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "academic-report",
      element: <AcademicsReport />,
      auth: authRoles.admin,
    },
  ],
};

export default AcademicsReportApp;