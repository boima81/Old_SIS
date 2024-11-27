import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

export const getSection = createAsyncThunk(
  "academics/section/getSection",
  async (id) => {
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.get(`${BASEURL}sections/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
      }
      return {};
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const createSection = createAsyncThunk(
  "academics/section/createSection",
  async (data) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}create-update-section`,
        data,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response) {
        toasterSuccess("success", "Semester created successfully");
      }
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const sectionsSlice = createSlice({
  name: "academics/section",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getSection.fulfilled]: (state, action) => action.payload,
    [createSection.fulfilled]: (state, action) => action.payload,
  },
});

export const selectSemester = ({ academics }) => academics.semester;

export default sectionsSlice.reducer;
