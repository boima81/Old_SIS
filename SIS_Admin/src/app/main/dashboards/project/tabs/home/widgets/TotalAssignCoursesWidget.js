import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function TotalAssignCoursesWidget({ user }) {
  return (
    <DashboardCommonCard
      totalNumber={user?.totalAssignCourses || 0}
      title="Total Courses Assigned"
      color="blue"
    />
  );
}

export default memo(TotalAssignCoursesWidget);
