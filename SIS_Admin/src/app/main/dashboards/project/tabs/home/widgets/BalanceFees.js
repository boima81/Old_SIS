import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";
import { currencySymbol } from "../../../../Shared/utils";

function BalanceFees({ user }) {
  const balance = user?.registration?.invoiceId?.remainingBalance
  return (
    <DashboardCommonCard
      totalNumber={balance ? `${currencySymbol}${balance}` : "-"}
      title="Balance Fees"
      color="yellow"
    />
  );
}

export default memo(BalanceFees);
