import settingsConfig from "app/configs/settingsConfig";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { authRoles } from "src/app/auth";
import TranscriptApp from "./Transcript/Transcript";
import TranscriptForm from "./Transcript/TranscriptForm";
import TranscriptStudent from "./Transcript/TranscriptStudent";
import Course from "./Transcript/Course/Course";

const AdmissionApp = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "transcript",
      element: <TranscriptApp />,
      auth: authRoles.student,
    },
    {
      path: "transcript/add",
      element: <TranscriptForm />,
      auth: authRoles.student,
    },
    {
      path: "transcript/student",
      element: <TranscriptStudent />,
      auth: authRoles.admin,
    },
    {
      path: "course-curriculum",
      element: <Course />,
      auth: authRoles.student,
    },
  ],
};

export default AdmissionApp;
