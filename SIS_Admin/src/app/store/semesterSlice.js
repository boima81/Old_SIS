import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../main/dashboards/Shared/utils";

export const getSemester = createAsyncThunk(
  "semester/getSemester",
  async () => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}semesters`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return [];
    }
  }
);

const studentSlice = createSlice({
  name: "semester",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getSemester.fulfilled]: (state, action) => action.payload,
  },
});

export const selectSemester = ({ semester }) => semester;

export default studentSlice.reducer;
