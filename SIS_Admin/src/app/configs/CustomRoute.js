import { lazy } from "react";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import AnalyticsDashboardApp from "../main/dashboards/analytics/AnalyticsDashboardApp";
import RegistrationApp from "../main/dashboards/student/AnalyticsDashboardApp";
import ProjectDashboardApp from "../main/dashboards/project/ProjectDashboardApp";
import { authRoles } from "../auth";

const MailboxAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: `/`,
      children: [
        {
          path: "/",
          element: <Navigate to="/dashboard" />,
          auth: authRoles.dashboardRole,
        },
        {
          path: `/dashboard`,
          element: <ProjectDashboardApp />,
          auth: authRoles.student,
        },
        {
          path: `/application`,
          element: <AnalyticsDashboardApp />,
          auth: authRoles.student,
        },
        {
          path: `/register`,
          element: <RegistrationApp />,
          auth: authRoles.student,
        },
      ],
    },
  ],
};

export default MailboxAppConfig;
