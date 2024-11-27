import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import StudentsHeader from "./StudentsHeader";
import StudentsTable from "./StudentsTable";

function Students() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<StudentsHeader />}
      content={<StudentsTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("admission", reducer)(Students);
