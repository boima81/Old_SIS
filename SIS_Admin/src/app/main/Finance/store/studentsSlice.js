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

export const getStudents = createAsyncThunk(
  "admission/students/getStudents",
  async ({
    search = "",
    type = "student",
    semester = "",
    course = "",
    program = "",
    startDate = "",
    endDate = "",
    paidFull = "",
    balance = "",
  }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const encodedSearch = encodeURIComponent(search);

      let url = `${BASEURL}students?search=${encodedSearch}&type=${type}`;

      if (semester) {
        url += `&semesterId=${semester}`;
      }
      if (course) {
        url += `&courseId=${course}`;
      }
      if (program) {
        url += `&programId=${program}`;
      }
      if (startDate) {
        url += `&startDate=${startDate}`;
      }
      if (endDate) {
        url += `&endDate=${endDate}`;
      }
      if (paidFull) {
        url += `&paidFull=${paidFull}`;
      }
      if (balance) {
        url += `&balance=${balance}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.data;
      console.log("first", data);
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

export const { selectAll: selectStudents, selectIds: selectStudentIds } =
  eventsAdapter.getSelectors((state) => state?.admission?.adminStudents);

const studentsSlice = createSlice({
  name: "admission/students",
  initialState: eventsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getStudents.fulfilled]: eventsAdapter.setAll,
  },
});

export const selectApplication = ({ admission }) => admission.adminStudents;

export default studentsSlice.reducer;
