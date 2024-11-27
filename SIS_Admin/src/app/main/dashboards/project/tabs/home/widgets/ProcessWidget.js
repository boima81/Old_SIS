import { memo } from "react";
import { analyticsSteps } from "src/app/main/dashboards/Shared/utils";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function ProcessWidget({ user }) {
  const lastCompletedSteps = user?.applicationId?.last_step_completed || 1;
  const steps = analyticsSteps();
  const stepName = user?.applicationId?.is_completed
    ? "Application Submitted"
    : steps[lastCompletedSteps - 1];

  return (
    <DashboardCommonCard
      totalNumber={20}
      title="Registration Process"
      color="blue"
      path="/application"
      text={stepName}
    />
  );
}

export default memo(ProcessWidget);
