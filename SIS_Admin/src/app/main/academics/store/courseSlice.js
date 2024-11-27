import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../../dashboards/Shared/utils";

export const getCourse = createAsyncThunk(
  "academics/course/getCourse",
  async (id) => {
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.get(`${BASEURL}courses/${id}`, {
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

export const createCourse = createAsyncThunk(
  "academics/course/createCourse",
  async (data) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}create-update-course`,
        data,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const courseSlice = createSlice({
  name: "academics/course",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getCourse.fulfilled]: (state, action) => action.payload,
    [createCourse.fulfilled]: (state, action) => action.payload,
  },
});

export const selectCourse = ({ academics }) => academics.course;

export default courseSlice.reducer;
