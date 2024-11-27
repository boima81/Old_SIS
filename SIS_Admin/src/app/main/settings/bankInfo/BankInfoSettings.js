import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import BankInfoSettingForm from "./BankInfoForm";
import BankInfoSettingHeader from "./BankInfoSettingHeader";

function BankInfoSetting() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<BankInfoSettingHeader />}
      content={<BankInfoSettingForm />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("settingsApp", reducer)(BankInfoSetting);
