import settingsConfig from "app/configs/settingsConfig";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { authRoles } from "src/app/auth";
import Fees from "./Fees/Fees";

const FeesApp = lazy(() => import("./Fees/Fees"));
// const RegistrationFees = lazy(() =>
//   import("./RegistrationFees/RegistrationFees")
// );

const FeesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "fees",
      element: <Fees />,
      auth: authRoles.student,
    },
  ],
};

export default FeesAppConfig;
