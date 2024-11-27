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

export const getBalanceFees = createAsyncThunk(
  "finance/balancepayfees/getBalanceFees",
  async ({ search = "" }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(
        `${BASEURL}balance-fees?search=${search}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;

      return data;
    } catch (error) {
      toaster("error", error.response);
      return [];
    }
  }
);

export const updateBalanceStatus = createAsyncThunk(
  "finance/balancepayfees/updateBalanceStatus",
  async (updateApplication, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}update-balance-fees-status`,
        updateApplication,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;
      if (data) {
        toasterSuccess("Success", "Balance fee request updated successfully");
        dispatch(getBalanceFees());
      }
      return data?.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const balanceFeesSlice = createSlice({
  name: "finance/balancepayfees",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getBalanceFees.fulfilled]: (state, action) => action.payload,
    [updateBalanceStatus.fulfilled]: (state, action) => action.payload,
  },
});

export const selectBalanceFees = ({ finance }) => finance.balanceFees;

export default balanceFeesSlice.reducer;
