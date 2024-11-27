import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import AgencysHeader from "./AgencysHeader";
import AgencysTable from "./AgencysTable";
import withReducer from "app/store/withReducer";
import reducer from "./store";

function AgencyApp() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<AgencysHeader />}
      content={<AgencysTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("agencys", reducer)(AgencyApp);
// export default AgencyApp;
