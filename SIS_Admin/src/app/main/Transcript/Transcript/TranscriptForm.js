import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import TranscriptHeader from "./TranscriptHeader";
import TranscriptAdd from "./TranscriptAdd";

function Users() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<TranscriptHeader showSearchAddButton={false} />}
      content={<TranscriptAdd />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("finance", reducer)(Users);
