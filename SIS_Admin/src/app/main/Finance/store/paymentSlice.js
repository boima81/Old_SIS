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

export const getStudent = createAsyncThunk(
  "finance/singlePayment/getStudent",
  async (id) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}student/${id}`, {
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

export const updatePaymentStatus = createAsyncThunk(
  "finance/singlePayment/updatePaymentStatus",
  async (updatePayment, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}update-payment-status`,
        updatePayment,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;
      toasterSuccess("success", "Payment status successfully updated");

      return data?.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const paymentSlice = createSlice({
  name: "finance/singlePayment",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getStudent.fulfilled]: (state, action) => action.payload,
    [updatePaymentStatus.fulfilled]: (state, action) => action.payload,
  },
});

export const selectPayment = ({ finance }) => finance.singlePayment;

export default paymentSlice.reducer;
