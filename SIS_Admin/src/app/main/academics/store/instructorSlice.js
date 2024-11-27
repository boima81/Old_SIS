import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

export const getInstructor = createAsyncThunk(
  "academics/instructor/getInstructor",
  async (id) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}instructors/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const createInstructor = createAsyncThunk(
  "academics/instructor/createInstructor",
  async (data) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}create-update-instructor`,
        data,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response) {
        toasterSuccess("success", "Instructor successfully");
      }
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const instructorSlice = createSlice({
  name: "academics/instructor",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getInstructor.fulfilled]: (state, action) => action.payload,
    [createInstructor.fulfilled]: (state, action) => action.payload,
  },
});

export const selectInstructor = ({ academics }) => academics.instructor;

export default instructorSlice.reducer;
