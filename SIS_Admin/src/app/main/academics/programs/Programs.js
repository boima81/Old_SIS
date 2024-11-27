import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import ProgramsHeader from "./ProgramsHeader";
import ProgramsTable from "./ProgramsTable";

function Users() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<ProgramsHeader />}
      content={<ProgramsTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("academics", reducer)(Users);
