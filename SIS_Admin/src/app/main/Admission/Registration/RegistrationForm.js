import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import RegistrationHeader from "./RegistrationHeader";
import RegistrationTable from "./RegistrationTable";
import RegistrationAdd from "./RegistrationAdd";

function Users() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={
        <RegistrationHeader showSearchAddButton={false} isHomePage={false} />
      }
      content={<RegistrationAdd />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("application", reducer)(Users);
