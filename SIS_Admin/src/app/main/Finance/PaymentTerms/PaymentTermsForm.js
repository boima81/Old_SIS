import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import PaymentTermsHeader from "./PaymentTermsHeader";
import PaymentTermsAdd from "./PaymentTermsAdd";

function Users() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={
        <PaymentTermsHeader showSearchAddButton={false} isHomePage={false} />
      }
      content={<PaymentTermsAdd />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("finances", reducer)(Users);
