import FuseDialog from "@fuse/core/FuseDialog";
import FuseMessage from "@fuse/core/FuseMessage";
import FuseSuspense from "@fuse/core/FuseSuspense";
import { styled } from "@mui/material/styles";
import AppContext from "app/AppContext";
import { selectFuseCurrentLayoutConfig } from "app/store/fuse/settingsSlice";
import clsx from "clsx";
import { memo, useContext } from "react";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import SettingsPanel from "../shared-components/SettingsPanel";
import FooterLayout2 from "./components/FooterLayout2";
import LeftSideLayout2 from "./components/LeftSideLayout2";
import NavbarWrapperLayout2 from "./components/NavbarWrapperLayout2";

const Root = styled("div")(({ theme, config }) => ({
  ...(config.mode === "boxed" && {
    clipPath: "inset(0)",
    maxWidth: `${config.containerWidth}px`,
    margin: "0 auto",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }),
  ...(config.mode === "container" && {
    "& .container": {
      maxWidth: `${config.containerWidth}px`,
      width: "100%",
      margin: "0 auto",
    },
  }),
}));

function Layout2(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  return (
    <Root id="fuse-layout" className="w-full flex" config={config}>
      {config.leftSidePanel.display && <LeftSideLayout2 />}

      <div className="flex flex-col flex-auto min-w-0">
        <main
          id="fuse-main"
          className="flex flex-col flex-auto min-h-full min-w-0 relative"
        >
          {config.navbar.display && (
            <NavbarWrapperLayout2
              className={clsx(
                config.navbar.style === "fixed" && "sticky top-0 z-50"
              )}
            />
          )}

          <div className="sticky top-0 z-99">
            <SettingsPanel />
          </div>

          <div className="flex flex-col flex-auto min-h-0 relative z-10">
            <FuseDialog />

            <FuseSuspense>{useRoutes(routes)}</FuseSuspense>

            {props.children}
          </div>

          {config.footer.display && (
            <FooterLayout2
              className={config.footer.style === "fixed" && "sticky bottom-0"}
            />
          )}
        </main>
      </div>

      <FuseMessage />
    </Root>
  );
}

export default memo(Layout2);
