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

export const getPaymentTerms = createAsyncThunk(
  "finance/paymentTerms/getPaymentTerms",
  async () => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}paymentTerms`, {
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

export const deletePaymentTerms = createAsyncThunk(
  "finance/paymentTerm/deletePaymentTerms",
  async (ids, { dispatch }) => {
    if (ids?.length > 0) {
      try {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.delete(
          `${BASEURL}paymentTerms?id=${ids}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        dispatch(getPaymentTerms());
        toasterSuccess("Success", "Payment terms successfully deleted");
        return response.data;
      } catch (error) {
        console.log({ error });
        toaster("error", error.response);
        dispatch(getPaymentTerms());
        return {};
      }
    }
    return {};
  }
);

const eventsAdapter = createEntityAdapter({});

export const {
  selectAll: selectPaymentTermsData,
  selectIds: selectPaymentTermsIds,
} = eventsAdapter.getSelectors((state) => state?.finance?.paymentTerms);

const paymentTermsSlice = createSlice({
  name: "finance/paymentTerms",
  initialState: eventsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getPaymentTerms.fulfilled]: eventsAdapter.setAll,
    [deletePaymentTerms.fulfilled]: eventsAdapter.setAll,
  },
});

export const selectPaymentTerms = ({ finance }) => finance.paymentTerms;

export default paymentTermsSlice.reducer;
