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
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

export const getSingleCourseFee = createAsyncThunk(
  "finances/courseFee/getSingleCourseFee",
  async (id) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}first-courses-fees`, {
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

export const createUpdateCourseFees = createAsyncThunk(
  "finances/fees/createUpdateCourseFees",
  async (updateRegistration, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}create-update-courses-fees`,
        updateRegistration,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;
      dispatch(getSingleCourseFee());
      toasterSuccess("success", "Course Fee Saved Successfully");
      return data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const feeSlice = createSlice({
  name: "finances/courseFee",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getSingleCourseFee.fulfilled]: (state, action) => action.payload,
    [createUpdateCourseFees.fulfilled]: (state, action) => action.payload,
  },
});

export const selectCourseFee = ({ finances }) => finances.courseFee;

export default feeSlice.reducer;
