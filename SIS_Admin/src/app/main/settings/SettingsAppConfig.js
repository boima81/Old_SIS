import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { authRoles } from "src/app/auth";
import AppSetting from "./appSetting/AppSettings";
import BankInfoSettings from "./bankInfo/BankInfoSettings";
import Email from "./email/Email";
import EmailForm from "./email/EmailForm";

const Users = lazy(() => import("./users/Users"));
const User = lazy(() => import("./user/User"));
const Roles = lazy(() => import("./role/Role"));

const SettingsApp = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "settings/users",
      element: <Users />,
      auth: authRoles.admin,
    },
    {
      path: "settings/users/:userId",
      element: <User />,
      auth: authRoles.admin,
    },
    {
      path: "settings/email",
      element: <Email />,
      auth: authRoles.admin,
    },
    {
      path: "settings/email/:emailId",
      element: <EmailForm />,
      auth: authRoles.admin,
    },
    {
      path: "settings/roles",
      element: <Roles />,
      auth: authRoles.admin,
    },
    {
      path: "settings/application",
      element: <AppSetting />,
      auth: authRoles.admin,
    },
    {
      path: "settings/bank-info",
      element: <BankInfoSettings />,
      auth: authRoles.admin,
    },
  ],
};

export default SettingsApp;
