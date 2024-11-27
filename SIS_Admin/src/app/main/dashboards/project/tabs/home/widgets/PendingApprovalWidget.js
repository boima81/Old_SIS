import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function ProgramWidget() {
  return (
    <DashboardCommonCard
      totalNumber={50}
      title="Pending approval"
      color="blue"
    />
  );
}

export default memo(ProgramWidget);
