import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../../settings/store";
import FinanceReportHeader from "./FinanceReportHeader";
import FinanceReportTable from "./FinanceReportTable";

function FinanceReport() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<FinanceReportHeader />}
      content={<FinanceReportTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("settingsApp", reducer)(FinanceReport);
