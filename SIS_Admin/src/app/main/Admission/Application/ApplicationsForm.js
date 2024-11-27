import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import ApplicationsHeader from "./ApplicationsHeader";
import ApplicationsTable from "./ApplicationsTable";
import ApplicationsAdd from "./ApplicationsAdd";

function Users() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={
        <ApplicationsHeader showSearchAddButton={false} isHomePage={false} />
      }
      content={<ApplicationsAdd />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("application", reducer)(Users);
