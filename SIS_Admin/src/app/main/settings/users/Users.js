import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import UsersHeader from "./UsersHeader";
import UsersTable from "./UsersTable";

function Users() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<UsersHeader />}
      content={<UsersTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("settingsApp", reducer)(Users);
