import settingsConfig from "app/configs/settingsConfig";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { authRoles } from "src/app/auth";
import StepperFormWidget from "../dashboards/analytics/widgets/StepperFormWidget";
import ApplicationDetail from "./Application/Detail/ApplicationDetail";
import RegistrationDetails from "./Registration/Detail/RegistrationDetail";
import RegistrationForm from "./Registration/RegistrationForm";

const ApplicationApp = lazy(() => import("./Application/Applications"));
const RegistrationApp = lazy(() => import("./Registration/Registration"));
const ApplicationsForm = lazy(() => import("./Application/ApplicationsForm"));
const Students = lazy(() => import("./Student/Students"));
const Student = lazy(() => import("./SingleStudent/Student"));

const AdmissionApp = {
  settings: {
    layout: {},
    auth: authRoles.admission,
  },
  routes: [
    {
      path: "/admission/student",
      element: <Students />,
      auth: authRoles.admission,
    },
    {
      path: "/admission/student/:studentId",
      element: <Student />,
      auth: authRoles.admission,
    },
    // {
    //   path: "/admission/student/add",
    //   element: <Student />,
    //   auth: authRoles.admin,
    // },
    {
      path: "/admission/application",
      element: <ApplicationApp />,
      auth: authRoles.admission,
    },
    // {
    //   path: "/admission/application/new",
    //   element: <StepperFormWidget />,
    //   auth: authRoles.admin,
    // },
    {
      path: "/admission/application/:applicationId",
      element: <ApplicationsForm />,
      auth: authRoles.admission,
    },
    {
      path: "/admission/application/show/:id",
      element: <ApplicationDetail />,
      auth: authRoles.admission,
    },
    {
      path: "/admission/registration",
      element: <RegistrationApp />,
      auth: authRoles.admission,
    },
    {
      path: "/admission/registration/:registrationId",
      element: <RegistrationForm />,
      auth: authRoles.admission,
    },
    {
      path: "/admission/registration/show/:id",
      element: <RegistrationDetails />,
      auth: authRoles.admission,
    },
  ],
};

export default AdmissionApp;
