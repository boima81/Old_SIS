import FusePageSimple from "@fuse/core/FusePageSimple";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { selectUser } from "app/store/userSlice";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useThemeMediaQuery from "../../../../@fuse/hooks/useThemeMediaQuery";
import { countryCity } from "../../dashboards/Shared/utils";
import AboutTab from "./tabs/AboutTab";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
    "& > .container": {
      maxWidth: "100%",
    },
  },
}));

function ProfileApp() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const user = useSelector(selectUser);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <Root
      header={
        <div className="flex flex-col">
          <div
            className="h-50 lg:h-80 object-cover w-full"
            // src="assets/images/pages/profile/cover.jpg"
            // alt="Profile Cover"
          />
          {console.log("user", user)}
          <div className="flex flex-col flex-0 lg:flex-row items-center justify-between max-w-5xl w-full mx-auto px-32 lg:h-72">
            <div className="-mt-96 lg:-mt-88 rounded-full">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { delay: 0.1 } }}
              >
                <Avatar
                  sx={{ borderColor: "background.paper" }}
                  className="w-128 h-128 border-4"
                  src={
                    user?.avatarFile?.url || "assets/images/avatars/profile.png"
                  }
                  alt="User avatar"
                />
              </motion.div>
            </div>

            <div className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32">
              <div>
                <Typography className="text-lg font-bold leading-none">
                  {user?.userInformationId?.displayName}
                </Typography>
                <Typography color="text.secondary">
                  {countryCity(
                    user?.userInformationId?.country,
                    user?.userInformationId?.city
                  )}
                </Typography>
              </div>
            </div>
            <div className="flex justify-end gap-5 flex-1">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/apps/profile/change-password");
                }}
                type="button"
              >
                Change password
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/apps/profile/edit");
                }}
                type="submit"
              >
                Edit profile
              </Button>
            </div>

            {/* <div className="hidden lg:flex h-32 mx-32 border-l-2" /> */}

            {/* <div className="flex flex-1 justify-end my-16 lg:my-0">
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="inherit"
                variant="scrollable"
                scrollButtons={false}
                className="-mx-4 min-h-40"
                classes={{
                  indicator: "flex justify-center bg-transparent w-full h-full",
                }}
                TabIndicatorProps={{
                  children: (
                    <Box
                      sx={{ bgcolor: "text.disabled" }}
                      className="w-full h-full rounded-full opacity-20"
                    />
                  ),
                }}
              >
                <Tab
                  className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                  disableRipple
                  label="Timeline"
                />
                <Tab
                  className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                  disableRipple
                  label="About"
                />
                <Tab
                  className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                  disableRipple
                  label="Photos & Videos"
                />
              </Tabs>
            </div> */}
          </div>
        </div>
      }
      content={
        <div className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32">
          <AboutTab />
          {/* {selectedTab === 0 && <TimelineTab />} */}
          {/* {selectedTab === 1 && <AboutTab />} */}
          {/* {selectedTab === 2 && <PhotosVideosTab />} */}
        </div>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default ProfileApp;
