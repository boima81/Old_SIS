import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import PaymentTermsHeader from "./PaymentTermsHeader";
import PaymentTermsTable from "./PaymentTermsTable";

function PaymentTerms() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<PaymentTermsHeader />}
      content={<PaymentTermsTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("finances", reducer)(PaymentTerms);
