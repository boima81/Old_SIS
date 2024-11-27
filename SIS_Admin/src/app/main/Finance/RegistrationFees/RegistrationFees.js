import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import RegistrationFeesHeader from "./RegistrationFeesHeader";
import RegistrationFeesTable from "./RegistrationFeesTable";

function RegistrationFees() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<RegistrationFeesHeader />}
      content={<RegistrationFeesTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("finance", reducer)(RegistrationFees);
