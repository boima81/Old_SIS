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

export const getApplications = createAsyncThunk(
  "admission/application/getApplications",
  async () => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}applications`, {
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

export const getApplication = createAsyncThunk(
  "application/getApplication",
  async (id) => {
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.get(`${BASEURL}application/${id}`, {
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
  "admission/application/updateApplicationStatus",
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
      dispatch(getApplications());
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

const applicationSlice = createSlice({
  name: "admission/application",
  initialState: eventsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getApplications.fulfilled]: eventsAdapter.setAll,
    [getApplication.fulfilled]: eventsAdapter.setOne,
    [updateApplicationStatus.fulfilled]: eventsAdapter.upsertOne,
  },
});

export const selectApplication = ({ admission }) => admission.adminApplications;

export default applicationSlice.reducer;
