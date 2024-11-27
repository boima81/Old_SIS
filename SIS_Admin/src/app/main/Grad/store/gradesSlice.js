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

export const getGrades = createAsyncThunk(
  "grades/grades/getGrades",
  async ({ courseId, semesterId, programId }) => {
    try {
      let url = `${BASEURL}grade-course?limit=10`;

      if (courseId) {
        url += `&courseId=${courseId}`;
      }
      if (semesterId) {
        url += `&semesterId=${semesterId}`;
      }
      if (programId) {
        url += `&programId=${programId}`;
      }
      console.log("url", url);
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.data;

      return data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
    return [];
  }
);

// export const getApplication = createAsyncThunk(
//   "grades/getApplication",
//   async (id) => {
//     try {
//       if (id) {
//         const accessToken = await JwtService.getAccessToken();
//         const response = await axios.get(`${BASEURL}application/${id}`, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         const data = await response.data;

//         return data;
//       }
//       return {};
//     } catch (error) {
//       toaster("error", error.response);
//       return {};
//     }
//   }
// );

// export const updateApplicationStatus = createAsyncThunk(
//   "grades/updateApplicationStatus",
//   async (updateApplication, { dispatch }) => {
//     try {
//       const accessToken = await JwtService.getAccessToken();
//       const response = await axios.post(
//         `${BASEURL}update-application-status`,
//         updateApplication,
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );
//       const data = await response.data;

//       dispatch(getApplications());
//       return data?.data;
//     } catch (error) {
//       toaster("error", error.response);
//       return {};
//     }
//   }
// );

const eventsAdapter = createEntityAdapter();

export const {
  selectAll: selectApplications,
  selectIds: selectApplicationIds,
  // selectById: selectApplicationById,
} = eventsAdapter.getSelectors((state) => state.finance.fees);

const gradesSlice = createSlice({
  name: "grades/grades",
  initialState: eventsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getGrades.fulfilled]: (state, action) => action.payload,
    // [getApplication.fulfilled]: eventsAdapter.setOne,
    // [updateApplicationStatus.fulfilled]: eventsAdapter.upsertOne,
  },
});

export const selectGrades = ({ grades }) => grades?.grades;

export default gradesSlice.reducer;
