import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import ProgramsHeader from "./ProgramsHeader";
import ProgramsAdd from "./ProgramAdd";

function Users() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<ProgramsHeader showSearchAddButton={false} isHomePage={false} />}
      content={<ProgramsAdd />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("academics", reducer)(Users);
