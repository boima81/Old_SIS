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
import { toaster } from "../../dashboards/Shared/utils";

export const getPayments = createAsyncThunk(
  "finance/payment/getPayments",
  async ({ search = "" }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}payments?search=${search}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.data;

      return data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const eventsAdapter = createEntityAdapter({});

export const { selectAll: selectPaymentsData, selectIds: selectStudentIds } =
  eventsAdapter.getSelectors((state) => state?.finance?.payments);

const paymentsSlice = createSlice({
  name: "finance/payment",
  initialState: eventsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getPayments.fulfilled]: eventsAdapter.setAll,
  },
});

export const selectPayments = ({ finance }) => finance.payments;

export default paymentsSlice.reducer;
