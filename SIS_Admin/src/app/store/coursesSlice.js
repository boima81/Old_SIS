import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../main/dashboards/Shared/utils";

export const getCourses = createAsyncThunk("courses/getCourses", async () => {
  try {
    const accessToken = await JwtService.getAccessToken();
    const response = await axios.get(`${BASEURL}courses`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    toaster("error", error.response);
    return {};
  }
});

const coursesSlice = createSlice({
  name: "courses",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getCourses.fulfilled]: (state, action) => action.payload,
  },
});

export const selectCourses = ({ courses }) => courses;

export default coursesSlice.reducer;
