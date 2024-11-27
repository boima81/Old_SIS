import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function CreditWidget({ user }) {
  return (
    <DashboardCommonCard
      totalNumber={user?.programTotalCredit || "-"}
      title="Program Total Credits"
      color="yellow"
    />
  );
}

export default memo(CreditWidget);
