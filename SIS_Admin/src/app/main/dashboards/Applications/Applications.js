import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import withReducer from "app/store/withReducer";
import reducer from "../student/store";
import ApplicationsHeader from "./ApplicationsHeader";

function Applications() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<ApplicationsHeader />}
      // content={<ApplicationsTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("application", reducer)(Applications);
