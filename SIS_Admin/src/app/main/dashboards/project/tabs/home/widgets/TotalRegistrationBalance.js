import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";
import { addDollar } from "../../../../Shared/utils";

function TotalRegistrationBalance({ user }) {
  return (
    <DashboardCommonCard
      totalNumber={addDollar(user?.totalBalance, "int") || "-"}
      title="Total Balance(Registration)"
      color="red"
    />
  );
}

export default memo(TotalRegistrationBalance);
