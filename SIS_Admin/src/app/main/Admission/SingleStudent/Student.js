import { styled } from "@mui/material/styles";
import withReducer from "app/store/withReducer";
import { useState } from "react";

import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import withRouter from "@fuse/core/withRouter";

import FusePageSimple from "@fuse/core/FusePageSimple";

import reducer from "../store";
import UserHeader from "./UserHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";

function Student(props) {
  const Root = styled(FusePageSimple)(({ theme }) => ({
    "& .FusePageSimple-header": {
      backgroundColor: theme.palette.background.paper,
      borderBottomWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
      "& > .container": {
        maxWidth: "100%",
      },
    },
  }));

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [tabValue, setTabValue] = useState(0);

  return (
    <Root
      header={<UserHeader />}
      content={
        // <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl h-full">
        <div className="p-16 w-full sm:p-24 max-w-3xl">
          <div className={tabValue !== 0 ? "hidden" : ""}>
            <BasicInfoTab navigate={(url) => props.navigate(url)} />
          </div>
        </div>
      }
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withRouter(withReducer("admission", reducer)(Student));
