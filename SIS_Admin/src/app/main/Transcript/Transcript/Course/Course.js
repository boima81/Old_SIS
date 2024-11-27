import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import axios from "axios";
import { useEffect, useState } from "react";

import { toaster, toasterSuccess } from "src/app/main/dashboards/Shared/utils";
import TranscriptHeader from "./CourseHeader";
import TranscriptTable from "./CourseTable";

import reducer from "../../store";

function Course() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [data, setData] = useState({ data: [] });
  const getTableData = async () => {
    try {
      const accessToken = await JwtService.getAccessToken();

      const response = await axios.get(`${BASEURL}course-curriculum`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const TraData = await response.data;
      setData(TraData);
      return TraData;
    } catch (error) {
      toaster("error", error.response);
      return [];
    }
  };

  useEffect(() => {
    getTableData();
  }, []);
  return (
    <FusePageCarded
      header={<TranscriptHeader programName={data?.program} />}
      content={<TranscriptTable data={data?.data} />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("finance", reducer)(Course);
