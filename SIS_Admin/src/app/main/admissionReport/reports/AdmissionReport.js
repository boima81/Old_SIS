import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../../settings/store";
import AdmissionReportHeader from "./AdmissionReportHeader";
import AdmissionReportTable from "./AdmissionReportTable";

function AdmissionReport() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<AdmissionReportHeader />}
      content={<AdmissionReportTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("studentReports", reducer)(AdmissionReport);
