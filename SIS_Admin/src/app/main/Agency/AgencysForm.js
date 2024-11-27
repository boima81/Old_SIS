import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import AgencyAdd from "./AgencyAdd";
import AgencysHeader from "./AgencysHeader";

function AgencyForm() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<AgencysHeader showSearchAddButton={false} isHomePage={false} />}
      content={<AgencyAdd />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

// export default withReducer("academics", reducer)(Users);
export default AgencyForm;
