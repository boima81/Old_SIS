import { authRoles } from "src/app/auth";
import AgencyApp from "./Agencys";
import AgencyForm from "./AgencysForm";

const AgencyConfigApp = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "referral",
      element: <AgencyApp />,
      auth: authRoles.admin,
    },
    {
      path: "referral/add",
      element: <AgencyForm />,
      auth: authRoles.admin,
    },
    {
      path: "agency/:agencyId",
      element: <AgencyForm />,
      auth: authRoles.admin,
    },
  ],
};

export default AgencyConfigApp;
