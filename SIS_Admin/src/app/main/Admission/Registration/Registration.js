import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import RegistrationHeader from "./RegistrationHeader";
import RegistrationTable from "./RegistrationTable";

function Users() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<RegistrationHeader />}
      content={<RegistrationTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("admission", reducer)(Users);
