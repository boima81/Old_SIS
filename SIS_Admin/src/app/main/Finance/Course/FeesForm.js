import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import FeesHeader from "./FeesHeader";
import FeesAdd from "./FeesAdd";

function Users() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<FeesHeader showSearchAddButton={false} />}
      content={<FeesAdd />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("finance", reducer)(Users);
