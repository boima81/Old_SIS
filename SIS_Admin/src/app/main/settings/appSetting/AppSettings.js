import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import AppSettingForm from "./AppSettingForm";
import AppSettingHeader from "./AppSettingHeader";

function AppSetting() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<AppSettingHeader />}
      content={<AppSettingForm />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("settingsApp", reducer)(AppSetting);
