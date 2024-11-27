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
import { toaster } from "../../dashboards/Shared/utils";

export const getGradeByUser = createAsyncThunk(
  "grades/grade/getGradeByUser",
  async (semester) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}grade-byuser/${semester}`, {
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

export const createOrUpdateGrade = createAsyncThunk(
  "grades/grade/createOrUpdateGrade",
  async (gradeData) => {
    try {
      if (gradeData) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.post(`${BASEURL}grade-create`, gradeData, {
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

export const updateApplicationStatus = createAsyncThunk(
  "grades/grade/updateApplicationStatus",
  async (updateApplication, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}update-application-status`,
        updateApplication,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;
      // dispatch(getApplications());
      return data?.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const eventsAdapter = createEntityAdapter();

export const {
  selectAll: selectApplications,
  selectIds: selectApplicationIds,
  selectById: selectApplicationById,
} = eventsAdapter.getSelectors((state) => state.admission.adminApplications);

const gradeSlice = createSlice({
  name: "grades/grade",
  initialState: eventsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getGradeByUser.fulfilled]: (state, action) => action.payload,
    [createOrUpdateGrade.fulfilled]: (state, action) => action.payload,
    [updateApplicationStatus.fulfilled]: (state, action) => action.payload,
  },
});

export const selectGradeByUser = ({ grades }) => grades?.grade;

export default gradeSlice.reducer;
