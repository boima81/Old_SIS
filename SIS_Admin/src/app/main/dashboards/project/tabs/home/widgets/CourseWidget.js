import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function CourseWidget({user}) {
  return (
    <DashboardCommonCard
      totalNumber={user?.coursesCredit || "-"}
      title="Credits Earned"
      color="red"
    />
  );
}

export default memo(CourseWidget);
