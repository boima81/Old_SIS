import FusePageSimple from "@fuse/core/FusePageSimple";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { selectUser } from "app/store/userSlice";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import useThemeMediaQuery from "../../../../@fuse/hooks/useThemeMediaQuery";
import { countryCity } from "../../dashboards/Shared/utils";
import EditAboutTab from "./tabs/EditAboutTab";

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

function EditProfileApp() {
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

          <div className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
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
        </div>
      }
      content={
        <div className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32">
          <EditAboutTab />
        </div>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default EditProfileApp;
