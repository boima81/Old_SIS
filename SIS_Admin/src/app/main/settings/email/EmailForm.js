import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../../Finance/store";
import EmailHeader from "./EmailHeader";
import EmailAdd from "./EmailAdd";

function Email() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<EmailHeader showSearchAddButton={false} isHomePage={false} />}
      content={<EmailAdd />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("finances", reducer)(Email);
