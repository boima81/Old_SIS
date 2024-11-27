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

export const getStudentsRegistrationData = createAsyncThunk(
  "finances/students/getStudentsRegistrationData",
  async ({ search = "", studentId = "" }) => {
    try {
      console.log("studentId", studentId);
      const accessToken = await JwtService.getAccessToken();
      const encodedSearch = encodeURIComponent(search);

      let url = `${BASEURL}students-registration-list/${studentId}`;

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

const studentsRegistrationSlice = createSlice({
  name: "finances/students",
  initialState: eventsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getStudentsRegistrationData.fulfilled]: (state, action) => action.payload,
  },
});

export const selectRegistrationListData = ({ finances }) => {
  console.log("finances", finances);
  return finances.studentsRegistrationList;
};

export default studentsRegistrationSlice.reducer;
