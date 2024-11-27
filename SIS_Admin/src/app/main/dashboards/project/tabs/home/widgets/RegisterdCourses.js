import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function RegisterdCourses({user}) {
  return (
    <DashboardCommonCard
      totalNumber={user?.coursesCount || "-"}
      title="Currently registered courses"
      color="red"
    />
  );
}

export default memo(RegisterdCourses);
