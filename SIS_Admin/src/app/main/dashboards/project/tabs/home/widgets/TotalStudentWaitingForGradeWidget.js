import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function TotalStudentWaitingForGradeWidget() {
  return <DashboardCommonCard text="-" totalNumber="-" title="GPA" color="green" />;
}

export default memo(TotalStudentWaitingForGradeWidget);
