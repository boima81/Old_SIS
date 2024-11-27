import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function ProgramWidget({user}) {
  return (
    <DashboardCommonCard
      totalNumber={user?.totalPrograms || "-"}
      title="Total Program"
      color="yellow"
    />
  );
}

export default memo(ProgramWidget);
