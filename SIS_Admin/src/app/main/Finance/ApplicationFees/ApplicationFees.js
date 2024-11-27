import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import ApplicationFeesHeader from "./ApplicationFeesHeader";
import ApplicationFeesTable from "./ApplicationFeesTable";

function ApplicationFees() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<ApplicationFeesHeader />}
      content={<ApplicationFeesTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("finance", reducer)(ApplicationFees);
