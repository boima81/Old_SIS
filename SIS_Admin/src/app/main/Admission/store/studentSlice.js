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
import { toastr } from "react-redux-toastr";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../../dashboards/Shared/utils";

export const getStudent = createAsyncThunk(
  "admission/student/getStudent",
  async (id) => {
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.get(`${BASEURL}student/${id}`, {
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

export const updateStudent = createAsyncThunk(
  "admission/student/updateStudent",
  async ({ id, ...body }, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const url = id ? `student/${id}` : `student-create`;
      const response = await axios.put(`${BASEURL}${url}`, body, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.data;
      if (data && id) {
        dispatch(getStudent(id));
        return data;
      }
      return {};
    } catch (error) {
      toastr.error(
        "Error",
        error?.response?.data?.message || "Something wrong"
      );
      return {};
    }
  }
);

const studentSlice = createSlice({
  name: "admission/student",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getStudent.fulfilled]: (state, action) => action.payload,
    [updateStudent.fulfilled]: (state, action) => action.payload,
  },
});

export const selectStudent = ({ admission }) => admission.adminStudent;

export default studentSlice.reducer;
