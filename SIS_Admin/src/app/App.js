// import "@mock-api";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import BrowserRouter from "@fuse/core/BrowserRouter";
import FuseLayout from "@fuse/core/FuseLayout";
import FuseTheme from "@fuse/core/FuseTheme";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { selectCurrentLanguageDirection } from "app/store/i18nSlice";
import { selectUser } from "app/store/userSlice";
import themeLayouts from "app/theme-layouts/themeLayouts";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import FuseAuthorization from "@fuse/core/FuseAuthorization";
import settingsConfig from "app/configs/settingsConfig";
import ReduxToastr from "react-redux-toastr";
import withAppProviders from "./withAppProviders";
import { AuthProvider } from "./auth/AuthContext";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { selectApplicationSetting } from "./main/settings/store/applicationSettingSlice";

// import axios from "axios";
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
  rtl: {
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
};

const App = () => {
  const [favicon, setFavicon] = useState("");
  const user = useSelector(selectUser);
  const langDirection = useSelector(selectCurrentLanguageDirection);
  const mainTheme = useSelector(selectMainTheme);
  const applicationSetting = useSelector(selectApplicationSetting);
  // console.log("applicationSetting", applicationSetting?.favicon?.url);
  console.log("user", user);
  useEffect(() => {
    setFavicon(
      user?.applicationSetting?.favicon?.url || applicationSetting?.favicon?.url
    );
  }, [applicationSetting, user]);

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/jpg" href={favicon} />
      </Helmet>
      <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
        <FuseTheme theme={mainTheme} direction={langDirection}>
          <AuthProvider>
            <BrowserRouter>
              <FuseAuthorization
                userRole={user.role}
                loginRedirectUrl={settingsConfig.loginRedirectUrl}
                user={user}
              >
                <ReduxToastr
                  timeOut={4000}
                  newestOnTop={false}
                  preventDuplicates
                  position="top-right"
                  getState={(state) => state.toastr} // This is the default
                  transitionIn="fadeIn"
                  transitionOut="fadeOut"
                  progressBar
                  closeOnToastrClick
                />
                <SnackbarProvider
                  maxSnack={5}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  classes={{
                    containerRoot:
                      "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99",
                  }}
                >
                  <FuseLayout layouts={themeLayouts} />
                </SnackbarProvider>
              </FuseAuthorization>
            </BrowserRouter>
          </AuthProvider>
        </FuseTheme>
      </CacheProvider>
    </>
  );
};

export default withAppProviders(App)();
