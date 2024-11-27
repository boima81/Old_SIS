import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "app/store/userSlice";

import ProjectDashboardAppHeader from "./ProjectDashboardAppHeader";
import HomeTab from "./tabs/home/HomeTab";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));

function ProjectDashboardApp(props) {
  const dispatch = useDispatch();
  // const widgets = useSelector(selectWidgets);
  const user = useSelector(selectUser);

  const [tabValue, setTabValue] = useState(0);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  // if (_.isEmpty(widgets)) {
  //   return null;
  // }

  return (
    <Root
      header={<ProjectDashboardAppHeader />}
      content={
        <div className="w-full p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
          <HomeTab />
        </div>
      }
    />
  );
}

export default ProjectDashboardApp;
