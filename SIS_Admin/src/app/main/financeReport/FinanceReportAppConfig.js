import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { authRoles } from "src/app/auth";
import AppSetting from "../settings/appSetting/AppSettings";
import BankInfoSettings from "../settings/bankInfo/BankInfoSettings";
import Email from "../settings/email/Email";
import EmailForm from "../settings/email/EmailForm";
import FinanceReport from "./reports/FinanceReport";

const Users = lazy(() => import("../settings/users/Users"));
const User = lazy(() => import("../settings/user/User"));
const Roles = lazy(() => import("../settings/role/Role"));

const FinanceReportApp = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "finance-report",
      element: <FinanceReport />,
      auth: authRoles.admin,
    },
  ],
};

export default FinanceReportApp;
