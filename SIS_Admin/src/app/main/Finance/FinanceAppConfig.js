import settingsConfig from "app/configs/settingsConfig";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { authRoles } from "src/app/auth";
import Student from "./SingleStudent/Student";
import ApplicationFee from "./SingleApplicationFees/ApplicationFee";
import Students from "./Student/Students";
import ApplicationFees from "./ApplicationFees/ApplicationFees";
import PaymentTerms from "./PaymentTerms/PaymentTerms";
import PaymentTermsForm from "./PaymentTerms/PaymentTermsForm";
import StudentDetails from "./SingleStudent/StudentDetails";
import StudentPaymentHistory from "./SingleStudent/StudentPaymentHistory";

const FeesApp = lazy(() => import("./Fees/Fees"));
const FeesForm = lazy(() => import("./Fees/FeesForm"));
const CourseApp = lazy(() => import("./Course/Course"));
const CourseForm = lazy(() => import("./Course/CourseForm"));
const BalanceFees = lazy(() => import("./BalanceFees/BalanceFees"));

const RegistrationFees = lazy(() =>
  import("./RegistrationFees/RegistrationFees")
);

const AdmissionApp = {
  settings: {
    layout: {},
    auth: authRoles.finance,
  },
  routes: [
    {
      path: "/finance/fees",
      element: <FeesApp />,
      auth: authRoles.finance,
    },
    {
      path: "finance/fees/:feesId",
      element: <FeesForm />,
      auth: authRoles.finance,
    },
    {
      path: "finance/payment-terms",
      element: <PaymentTerms />,
      auth: authRoles.finance,
    },
    {
      path: "finance/payment-terms/:paymentTermsId",
      element: <PaymentTermsForm />,
      auth: authRoles.finance,
    },
    // {
    //   path: "/finance/course",
    //   element: <CourseApp />,
    //   auth: authRoles.finance,
    // },
    {
      path: "finance/course",
      element: <CourseForm />,
      auth: authRoles.finance,
    },
    {
      path: "/finance/student",
      element: <Students />,
      auth: authRoles.finance,
    },
    {
      path: "/finance/student/:studentId",
      element: <Student />,
      auth: authRoles.finance,
    },
    {
      path: "/finance/student/details/:studentId",
      element: <StudentDetails />,
      auth: authRoles.finance,
    },
    {
      path: "/finance/student/billing-history/:registrationId",
      element: <StudentPaymentHistory />,
      auth: authRoles.finance,
    },
    {
      path: "/finance/student/add",
      element: <Student />,
      auth: authRoles.finance,
    },
    {
      path: "/finance/application-fees",
      element: <ApplicationFees />,
      auth: authRoles.finance,
    },
    {
      path: "/finance/balance-fees",
      element: <BalanceFees />,
      auth: authRoles.finance,
    },
    {
      path: "/finance/application-fees/:feesId",
      element: <ApplicationFee />,
      auth: authRoles.finance,
    },
    {
      path: "/finance/application-fees/add",
      element: <ApplicationFee />,
      auth: authRoles.finance,
    },
    // {
    //   path: "/finance/payment-terms/add",
    //   element: <ApplicationFee />,
    //   auth: authRoles.finance,
    // },
    {
      path: "/finance/registration-fees",
      element: <RegistrationFees />,
      auth: authRoles.finance,
    },
  ],
};

export default AdmissionApp;
