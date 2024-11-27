import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function RegisteredCourses({user}) {
  return (
    <DashboardCommonCard
      totalNumber={user?.totalCourses || "-"}
      title="Total Registration Courses"
      color="purple"
    />
  );
}

export default memo(RegisteredCourses);
