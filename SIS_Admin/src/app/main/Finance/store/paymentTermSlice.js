// export const addEvent = createAsyncThunk(
//   "calendarApp/events/addEvent",
//   async (newEvent, { dispatch }) => {
//     const response = await axios.post("/api/calendar/events", newEvent);
//     const data = await response.data;

//     return data;
//   }
// );

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

export const getPaymentTerm = createAsyncThunk(
  "finance/paymentTerm/getPaymentTerm",
  async (id) => {
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.get(`${BASEURL}paymentTerms/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.data;
        return data;
      }
      return {};
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const createUpdatePaymentTerms = createAsyncThunk(
  "finance/paymentTerm/createUpdatePaymentTerms",
  async (termsData, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}create-update-paymentTerm`,
        termsData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;
      if (termsData?.id) {
        dispatch(getPaymentTerm(termsData?.id));
      }

      toasterSuccess("success", "Payment Terms Saved Successfully");
      return data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const paymentTermSlice = createSlice({
  name: "finance/paymentTerm",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getPaymentTerm.fulfilled]: (state, action) => action.payload,
    [createUpdatePaymentTerms.fulfilled]: (state, action) => action.payload,
  },
});

export const selectPaymentTerm = ({ finance }) => finance.paymentTerm;

export default paymentTermSlice.reducer;
