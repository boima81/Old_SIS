import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";

import { selectApplicationSetting } from "../settings/store/applicationSettingSlice";

const ServicePage = () => {
  const theme = useTheme();
  const applicationSetting = useSelector(selectApplicationSetting);

  return (
    <>
      <div className="flex flex-col gap-10 w-3/4 sm:container md:container lg:container mx-auto mt-20">
        <div>
          <Typography
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="text-24 md:text-32 font-extrabold tracking-tight flex gap-5
        items-center text-black cursor-pointer"
            component={Link}
            role="button"
            to="/sign-up"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <h1>Terms & services</h1>
          </Typography>
        </div>
        <div className="text-justify mt-40 text-lg tracking-tight leading-6 text-black-100">
          {ReactHtmlParser(applicationSetting?.services || "")}
        </div>
      </div>
    </>
  );
};

export default ServicePage;
