import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function RegisteredStudentApproval({ user }) {
  return (
    <DashboardCommonCard
      totalNumber={user?.registrationPending || "-"}
      title="Total Registrations waiting for Approval"
      color="green"
    />
  );
}

export default memo(RegisteredStudentApproval);
