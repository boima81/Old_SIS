import { memo } from "react";
import { currencySymbol } from "src/app/main/dashboards/Shared/utils";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function BalanceOverageWidget({ user }) {
  return <DashboardCommonCard totalNumber={user?.balanceOverage ? `${currencySymbol}${user?.balanceOverage}` : "-"} title="Balance Overage" color="green" />;
}

export default memo(BalanceOverageWidget);
