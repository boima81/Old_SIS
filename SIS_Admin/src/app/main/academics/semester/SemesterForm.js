import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import SemesterHeader from "./SemesterHeader";
import SemesterAdd from "./SemesterAdd";

function SemesterForm() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<SemesterHeader showSearchAddButton={false} isHomePage={false} />}
      content={<SemesterAdd />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("academics", reducer)(SemesterForm);
