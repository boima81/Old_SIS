import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import axios from "axios";
import { useEffect, useState } from "react";
import reducer from "../store";
import TranscriptHeader from "./TranscriptHeader";
import TranscriptTable from "./TranscriptTable";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

function Transcript() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [data, setData] = useState([]);
  const getTableData = async () => {
    try {
      const accessToken = await JwtService.getAccessToken();

      const response = await axios.get(`${BASEURL}transcript/list`, {
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

  const getGenerateTableData = async () => {
    try {
      const accessToken = await JwtService.getAccessToken();

      const response = await axios.get(`${BASEURL}transcript`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const TraData = await response.data;
      if (!TraData?.err) {
        toasterSuccess("Transcript File generated", "File generated successfully");
        getTableData()
      } else {
        toaster("No Registraion", response);
      }
      return TraData;
    } catch (error) {
      toaster("error", error.response);
      return [];
    }
  };

  useEffect(() => {
    getTableData()
  }, []);
  return (
    <FusePageCarded
      header={<TranscriptHeader getGenerateTableData={getGenerateTableData} />}
      content={<TranscriptTable data={data} />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("finance", reducer)(Transcript);
