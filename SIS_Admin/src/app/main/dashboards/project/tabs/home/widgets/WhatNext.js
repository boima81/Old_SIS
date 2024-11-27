import { memo } from "react";
import { analyticsSteps } from "src/app/main/dashboards/Shared/utils";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function WhatNext({ user }) {
  let currentStage = "-";
  let path = "";
  if (user?.applicationId?.is_completed && user?.applicationId?.is_approved) {
    if (
      !user?.registration?.last_step_completed ||
      user?.registration?.last_step_completed === 0 ||
      user?.registration?.last_step_completed === 1
    ) {
      currentStage = "Begin Registration";
      path = "/register";
    } else if (
      (user?.registration?.last_step_completed === 2 ||
        user?.registration?.last_step_completed === 3 ||
        user?.registration?.last_step_completed === 4) &&
      !user?.registration?.is_completed
    ) {
      currentStage = "Pay Fees";
      path = "/register";
    } else if (user?.registration?.is_completed) {
      currentStage = "Registration Complete";
      path = "/register";
    }
  } else {
    const lastCompletedSteps = user?.applicationId?.last_step_completed || 1;
    const steps = analyticsSteps();
    const stepName = user?.applicationId?.is_completed
      ? "Application Submitted"
      : steps[lastCompletedSteps - 1];
    currentStage = stepName;
    path = "/application";
  }

  return (
    <DashboardCommonCard
      text={currentStage}
      title="What Next?"
      color="blue"
      path={path}
    />
  );
}

export default memo(WhatNext);
