import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../../Finance/store";
import SectionsHeader from "./SectionsHeader";
import SectionsAdd from "./SectionsAdd";

function Users() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<SectionsHeader showSearchAddButton={false} isHomePage={false} />}
      content={<SectionsAdd />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("finances", reducer)(Users);
