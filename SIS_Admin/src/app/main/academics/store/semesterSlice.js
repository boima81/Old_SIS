import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

export const getSemester = createAsyncThunk(
  "academics/course/getSemester",
  async (id) => {
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.get(`${BASEURL}semesters/${id}`, {
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

export const createSemester = createAsyncThunk(
  "academics/course/createSemester",
  async (data) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}create-update-semester`,
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

const semesterSlice = createSlice({
  name: "academics/semester",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getSemester.fulfilled]: (state, action) => action.payload,
    [createSemester.fulfilled]: (state, action) => action.payload,
  },
});

export const selectSemester = ({ academics }) => academics.semester;

export default semesterSlice.reducer;
