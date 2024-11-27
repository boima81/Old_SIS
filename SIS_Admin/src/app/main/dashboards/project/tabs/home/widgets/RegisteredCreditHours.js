import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function RegisteredCreditHours({ user }) {
  return (
    <DashboardCommonCard
      totalNumber={user?.totalCreditHours || "-"}
      title="Total Registered Credit Hours"
      color="teal"
    />
  );
}

export default memo(RegisteredCreditHours);
