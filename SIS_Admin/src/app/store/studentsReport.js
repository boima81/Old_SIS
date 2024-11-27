import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../main/dashboards/Shared/utils";

export const getStudentsReport = createAsyncThunk(
  "studentReports/getStudentsReport",
  async (query) => {
    try {
      const queryString = Object.keys(query);
      const qs = queryString
        ?.map((qurString) => `${qurString}=${query[qurString]}`)
        ?.join("&");
        console.log({qs})
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}reports/students?${qs}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response?.data?.data || [];
    } catch (error) {
      toaster("error", error.response);
      return [];
    }
  }
);

const studentsReportSlice = createSlice({
  name: "studentReports",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getStudentsReport.fulfilled]: (state, action) => action.payload,
  },
});

export const selectStudentsReport = ({ studentsReport }) => studentsReport;

export default studentsReportSlice.reducer;
