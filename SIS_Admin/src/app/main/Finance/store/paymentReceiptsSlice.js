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

export const getPaymentReceipts = createAsyncThunk(
  "finance/paymentReceipts/getPaymentReceipts",
  async () => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(
        `${BASEURL}registration-payments-receipt`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;

      return data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const eventsAdapter = createEntityAdapter({});

export const {
  selectAll: selectPaymentReceiptsData,
  selectIds: selectPaymentReceiptsIds,
} = eventsAdapter.getSelectors((state) => state?.finance?.paymentReceipts);

const paymentsSlice = createSlice({
  name: "finance/paymentReceipts",
  initialState: eventsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getPaymentReceipts.fulfilled]: eventsAdapter.setAll,
  },
});

export const selectPaymentReceiptss = ({ finance }) => finance.paymentReceipts;

export default paymentsSlice.reducer;
