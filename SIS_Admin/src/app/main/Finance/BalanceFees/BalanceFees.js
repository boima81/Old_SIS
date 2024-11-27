import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import BalanceFeesHeader from "./BalanceFeesHeader";
import BalanceFeesTable from "./BalanceFeesTable";

function BalanceFees() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<BalanceFeesHeader />}
      content={<BalanceFeesTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("finance", reducer)(BalanceFees);
