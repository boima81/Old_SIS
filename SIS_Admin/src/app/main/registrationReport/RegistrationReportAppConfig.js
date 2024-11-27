import { authRoles } from "src/app/auth";
import RegistrationReport from "./reports/RegistrationReport";

const RegistrationReportApp = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "registration-report",
      element: <RegistrationReport />,
      auth: authRoles.admin,
    },
  ],
};

export default RegistrationReportApp;
