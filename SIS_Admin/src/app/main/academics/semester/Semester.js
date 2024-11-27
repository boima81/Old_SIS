import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import SemesterHeader from "./SemesterHeader";
import SemesterTable from "./SemesterTable";

function Users() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<SemesterHeader />}
      content={<SemesterTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("academics", reducer)(Users);
