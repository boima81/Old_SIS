import settingsConfig from "app/configs/settingsConfig";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { authRoles } from "src/app/auth";
import Fees from "./PayFees/Fees";

const FeesApp = lazy(() => import("./PayFees/Fees"));
// const RegistrationFees = lazy(() =>
//   import("./RegistrationFees/RegistrationFees")
// );

const PayFeesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "pay-fees",
      element: <Fees />,
      auth: authRoles.student,
    },
  ],
};

export default PayFeesAppConfig;
