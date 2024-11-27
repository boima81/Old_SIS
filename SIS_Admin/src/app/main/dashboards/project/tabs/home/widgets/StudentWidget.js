import { memo } from "react";
import DashboardCommonCard from "../../../../Shared/Dashboard/DashboardCommonCard";

function ProgramWidget({ user }) {
  return (
    <DashboardCommonCard
      totalNumber={user?.totalStudents || "-"}
      title="Total Students"
      color="pink"
    />
  );
}

export default memo(ProgramWidget);
