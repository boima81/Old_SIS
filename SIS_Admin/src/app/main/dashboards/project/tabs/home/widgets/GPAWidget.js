import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function GPAWidget({user}) {
  return <DashboardCommonCard  totalNumber={
    user?.gpa || "-"
  } title="GPA" color="green" />;
}

export default memo(GPAWidget);
