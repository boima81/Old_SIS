import settingsConfig from "app/configs/settingsConfig";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { authRoles } from "src/app/auth";
import GradForm from "./Grad/GradForm";
import GradApp from "./Grad/Grad";

const AdmissionApp = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "grad",
      element: <GradApp />,
      auth: [...authRoles.student, ...authRoles.instructors],
    },
    {
      path: "grad/add",
      element: <GradForm />,
      auth: [...authRoles.student, ...authRoles.admin],
    },
  ],
};

export default AdmissionApp;
