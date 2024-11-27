import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../../dashboards/Shared/utils";

export const getAgency = createAsyncThunk("agency/singeAgency/getAgency", async (id) => {
  try {
    if (id) {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}agency/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    }
    return {};
  } catch (error) {
    toaster("error", error.response);
    return {};
  }
});

export const createAgency = createAsyncThunk(
  "agency/singeAgency/createAgency",
  async (data) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(`${BASEURL}agency/create`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log({ response })
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const agencySlice = createSlice({
  name: "agency/singeAgency",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getAgency.fulfilled]: (state, action) => action.payload,
    [createAgency.fulfilled]: (state, action) => action.payload,
  },
});

// Single recored
export const selectAgency = ({ agencys }) => agencys?.agency || {};

export default agencySlice.reducer;
