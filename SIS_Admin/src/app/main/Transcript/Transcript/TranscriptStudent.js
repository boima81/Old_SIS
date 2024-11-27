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
import TranscriptStudentTable from "./TranscriptStudentTable";

function TranscriptStudent() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTableData = async (search = "") => {
    try {
      setLoading(true);
      const accessToken = await JwtService.getAccessToken();

      const response = await axios.get(`${BASEURL}transcript/student-list?search=${search}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const TraData = await response.data;
      setLoading(false);
      setData(TraData);
      return TraData;
    } catch (error) {
      setLoading(false);
      toaster("error", error.response);
      return [];
    }
  };

  const getGenerateTableData = async ({ userId }) => {
    try {
      const accessToken = await JwtService.getAccessToken();

      const response = await axios.get(
        `${BASEURL}transcript?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const TraData = await response.data;
      if (!TraData?.err) {
        toasterSuccess(
          "Transcript File generated",
          "File generated successfully"
        );
        getTableData();
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
    getTableData();
  }, []);
  return (
    <FusePageCarded
      header={
        <TranscriptHeader
          getGenerateTableData={getGenerateTableData}
          hideButton
          searchDisplay
          getTableData={getTableData}
        />
      }
      content={
        <TranscriptStudentTable
          loading={loading}
          data={data}
          getGenerateTableData={getGenerateTableData}
        />
      }
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("finance", reducer)(TranscriptStudent);
