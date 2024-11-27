import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";
import { currencySymbol } from "../../../../Shared/utils";

function RegistrationFees({ user }) {
  return (
    <DashboardCommonCard
      totalNumber={
        user?.totalRegistrationFees ? `${currencySymbol}${user?.totalRegistrationFees}` : "-"
      }
      title="Total Registration Fees"
      color="gray"
    />
  );
}

export default memo(RegistrationFees);
