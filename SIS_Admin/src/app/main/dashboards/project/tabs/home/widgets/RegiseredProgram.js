import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function RegiseredProgram({user}) {
  return (
    <DashboardCommonCard
      // totalNumber={210}
      text={user?.programName || "-"}
      title="Registered Program"
      color="green"
    />
  );
} 

export default memo(RegiseredProgram);
