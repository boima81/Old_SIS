import authRoles from "../../auth/authRoles";
import PrivacyPolicyPage from "./PrivacyPolicyPage";

const PrivacyPolicyConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "privacy-policy",
      element: <PrivacyPolicyPage />,
    },
  ],
};

export default PrivacyPolicyConfig;
