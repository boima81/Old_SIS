import { memo } from "react";
import DashboardEvent from "../../../../Shared/Dashboard/DashboardEvent";

function EventWidget() {
  const eventList = [
    {
      id: 1,
      title: "Group Meeting",
      time: "10:30 AM",
    },
    {
      id: 2,
      title: "Public Beta Release",
      time: "11:00 AM",
    },
    {
      id: 3,
      title: "Coffee Break",
      time: "12:00 AM",
    },
    {
      id: 4,
      title: "Lunch",
      time: "01:00 AM",
    },
    {
      id: 5,
      title: "Dinner with David",
      time: "05:30 PM",
    },
  ];
  return (
    <DashboardEvent title="Upcoming Events & Holidays" eventList={eventList} />
  );
}

export default memo(EventWidget);
