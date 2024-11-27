import { lazy } from "react";

const ProfileApp = lazy(() => import("./ProfileApp"));
const EditProfileApp = lazy(() => import("./EditProfileApp"));
const ChangePasswordApp = lazy(() => import("./ChangePasswordApp"));
const profileAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/profile",
      element: <ProfileApp />,
    },
    {
      path: "apps/profile/edit",
      element: <EditProfileApp />,
    },
    {
      path: "apps/profile/change-password",
      element: <ChangePasswordApp />,
    },
  ],
};

export default profileAppConfig;
