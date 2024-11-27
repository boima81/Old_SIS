import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

export const getProgram = createAsyncThunk(
  "academics/program/getProgram",
  async (id) => {
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.get(`${BASEURL}programs/${id}`, {
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

export const createProgram = createAsyncThunk(
  "academics/program/createProgram",
  async (data) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}create-update-program`,
        data,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response) {
        toasterSuccess("success", "Program created successfully");
      }
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const programSlice = createSlice({
  name: "academics/program",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getProgram.fulfilled]: (state, action) => action.payload,
    [createProgram.fulfilled]: (state, action) => action.payload,
  },
});

export const selectProgram = ({ academics }) => academics.program || {};

export default programSlice.reducer;
