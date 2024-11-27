// export const addEvent = createAsyncThunk(
//   "calendarApp/events/addEvent",
//   async (newEvent, { dispatch }) => {
//     const response = await axios.post("/api/calendar/events", newEvent);
//     const data = await response.data;

//     return data;
//   }
// );

import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

export const getBalanceFee = createAsyncThunk(
  "finance/balancepayfee/getBalanceFee",
  async (id = "") => {
    try {
      let url = "user-balance-fee";
      if (id) {
        url += `/${id}`;
      }
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}${url}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.data;

      return data;
    } catch (error) {
      toaster("error", error.response);
      return [];
    }
  }
);
export const createBalanceFees = createAsyncThunk(
  "finance/balancepayfee/createBalanceFees",
  async ({ ...body }, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(`${BASEURL}create-balance-fees`, body, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.data;
      if (data) {
        toasterSuccess("Success", "Balance pay request send");
      }
      return data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);
export const uploadFileBalanceFee = createAsyncThunk(
  "finance/balancepayfee/uploadFileBalanceFee",
  async ({ files, ...fileData }, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const formData = new FormData();
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < files?.length; i++) {
        const file = files?.[i];
        formData.append("file", file);
      }
      const response = await axios.post(`${BASEURL}file-upload`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.data;
      return dispatch(
        createBalanceFees({
          [fileData.key]: data.data,
          ...fileData,
        })
      );
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const balanceFeeSlice = createSlice({
  name: "finance/balancepayfee",
  initialState: {},
  reducers: {},
  extraReducers: {
    [createBalanceFees.fulfilled]: (state, action) => action.payload,
    [uploadFileBalanceFee.fulfilled]: (state, action) => action.payload,
    [getBalanceFee.fulfilled]: (state, action) => action.payload,
  },
});

export const selectBalanceFee = ({ finance }) => finance.balanceFee;

export default balanceFeeSlice.reducer;
