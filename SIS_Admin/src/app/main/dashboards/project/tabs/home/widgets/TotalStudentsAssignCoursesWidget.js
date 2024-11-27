import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function TotalStudentsAssignCoursesWidget({ user }) {
  return (
    <DashboardCommonCard
      totalNumber={user?.totalAssignCoursesStudent || 0}
      title="Total Students in assigned courses"
      color="pink"
    />
  );
}

export default memo(TotalStudentsAssignCoursesWidget);
