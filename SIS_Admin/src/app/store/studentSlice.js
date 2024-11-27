import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../main/dashboards/Shared/utils";

export const getProgram = createAsyncThunk("student/getProgram", async () => {
  try {
    const accessToken = await JwtService.getAccessToken();

    const response = await axios.get(`${BASEURL}program`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await response.data;

    return data;
  } catch (error) {
    toaster("error", error.response);
    return [];
  }
});

const studentSlice = createSlice({
  name: "student",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getProgram.fulfilled]: (state, action) => action.payload,
  },
});

export const selectProgram = ({ student }) => student;

export default studentSlice.reducer;
