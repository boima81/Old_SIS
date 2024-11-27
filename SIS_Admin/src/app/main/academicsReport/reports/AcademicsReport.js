import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../../settings/store";
import AcademicsReportHeader from "./AcademicsReportHeader";
import AcademicsReportTable from "./AcademicsReportTable";

function AcademicsReport() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<AcademicsReportHeader />}
      content={<AcademicsReportTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("settingsApp", reducer)(AcademicsReport);
