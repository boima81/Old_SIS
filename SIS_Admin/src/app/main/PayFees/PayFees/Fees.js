import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../../Finance/store";
import FeesHeader from "./FeesHeader";
import FeesAdd from "./FeesAdd";
// import FeesTable from "./FeesTable";

function Fees() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<FeesHeader />}
      content={<FeesAdd />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}
export default withReducer("finance", reducer)(Fees);
