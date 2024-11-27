import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";
import { addDollar } from "../../../../Shared/utils";

function ApplicantFeesWaitingApproval({ user }) {
  return (
    <DashboardCommonCard
      totalNumber={addDollar(user?.totalWaitingApplicationFees) || "-"}
      title="Application Fees Waiting Approval"
      color="red"
    />
  );
}

export default memo(ApplicantFeesWaitingApproval);
