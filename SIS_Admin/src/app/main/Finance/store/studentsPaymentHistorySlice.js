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

export const getStudentsPaymentHistoryData = createAsyncThunk(
  "finances/students/getStudentsPaymentHistoryData",
  async ({ search = "", registrationId = "" }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const encodedSearch = encodeURIComponent(search);

      let url = `${BASEURL}paymentHistory/list/${registrationId}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.data;
      console.log({ students: data });
      return data;
    } catch (error) {
      console.log("error", error);
      toaster("error", error.response);
      return {};
    }
  }
);

const eventsAdapter = createEntityAdapter({});

const studentsPaymentHistorySlice = createSlice({
  name: "finances/students",
  initialState: eventsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getStudentsPaymentHistoryData.fulfilled]: (state, action) =>
      action.payload,
  },
});

export const selectPaymentHistoryData = ({ finances }) => {
  console.log("finances", finances);
  return finances.studentsPaymentHistoryData;
};

export default studentsPaymentHistorySlice.reducer;
