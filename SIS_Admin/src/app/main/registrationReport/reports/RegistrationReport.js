import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../../settings/store";
import RegistrationReportHeader from "./RegistrationReportHeader";
import RegistrationReportTable from "./RegistrationReportTable";

function RegistrationReport() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<RegistrationReportHeader />}
      content={<RegistrationReportTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("settingsApp", reducer)(RegistrationReport);
