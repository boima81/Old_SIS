import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function ApplicantsWaitingApproval({ user }) {
  return (
    <DashboardCommonCard
      totalNumber={user?.applicationPending || "-"}
      title="Total Applicants Waiting Approval"
      color="red"
    />
  );
}

export default memo(ApplicantsWaitingApproval);
