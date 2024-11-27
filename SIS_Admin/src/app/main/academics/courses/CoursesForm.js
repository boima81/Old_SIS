import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import CoursesHeader from "./CoursesHeader";
import CoursesAdd from "./CoursesAdd";

function Users() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<CoursesHeader showSearchAddButton={false} isHomePage={false} />}
      content={<CoursesAdd />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("academics", reducer)(Users);
