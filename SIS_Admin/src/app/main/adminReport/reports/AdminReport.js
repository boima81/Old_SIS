import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../../settings/store";
import AdminReportHeader from "./AdminReportHeader";
import AdminReportTable from "./AdminReportTable";

function AdminReport() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<AdminReportHeader />}
      content={<AdminReportTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("settingsApp", reducer)(AdminReport);
