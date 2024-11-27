import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";
import { addDollar } from "../../../../Shared/utils";

function RegistrationFeesWaitingApproval({ user }) {
  return (
    <DashboardCommonCard
      totalNumber={addDollar(user?.totalWaitingRegistrationFees) || "-"}
      title="Registration Fees Waiting Approval"
      color="red"
    />
  );
}

export default memo(RegistrationFeesWaitingApproval);
