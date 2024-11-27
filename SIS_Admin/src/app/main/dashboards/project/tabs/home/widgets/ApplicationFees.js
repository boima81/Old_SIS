import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";
import { currencySymbol } from "../../../../Shared/utils";

function ApplicationFees({ user }) {
  return (
    <DashboardCommonCard
      totalNumber={
        user?.totalApplicationFess ? `${currencySymbol}${user?.totalApplicationFess}` : "-"
      }
      title="Total Application Fees"
      color="blue"
    />
  );
}

export default memo(ApplicationFees);
