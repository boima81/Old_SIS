import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import JwtService from "src/app/auth/services/jwtService";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

export const getSemesters = createAsyncThunk(
  "settingsApp/semesterSetting/getSemesters",
  async ({ search = "" }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}semesters?search=${search}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return [];
    }
  }
);

const applicationSemesterSettingSlice = createSlice({
  name: "settingsApp/semesterSetting",
  initialState: null,
  extraReducers: {
    [getSemesters.fulfilled]: (state, action) => action.payload,
  },
});

export const selectSemesterSetting = ({ settingsApp }) =>
  settingsApp?.applicationSettingSemester;

export default applicationSemesterSettingSlice.reducer;
