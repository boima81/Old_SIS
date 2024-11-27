import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../main/dashboards/Shared/utils";

export const getCourse = createAsyncThunk("course/getCourse", async (id) => {
  try {
    if (id) {
      const accessToken = await JwtService.getAccessToken();

      const response = await axios.get(`${BASEURL}semester/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await response.data;

      return data;
    }
    return [];
  } catch (error) {
    toaster("error", error.response);
    return [];
  }
});

const studentSlice = createSlice({
  name: "course",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getCourse.fulfilled]: (state, action) => action.payload,
  },
});

export const selectCourse = ({ course }) => course;

export default studentSlice.reducer;
