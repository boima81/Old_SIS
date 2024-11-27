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

export const getRegistrations = createAsyncThunk(
  "admission/registration/getRegistrations",
  async ({
    search = "",
    semester = "",
    registrationState = "",
    course = "",
    program = "",
  }) => {
    try {
      let url = `${BASEURL}registrations?search=${search}`;
      if (semester) {
        url += `&semester=${semester}`;
      }
      if (registrationState) {
        url += `&registrationState=${registrationState}`;
      }
      if (course) {
        url += `&course=${course}`;
      }
      if (program) {
        url += `&program=${program}`;
      }
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
  }
);

export const getRegistration = createAsyncThunk(
  "admission/application/getRegistration",
  async (id) => {
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.get(`${BASEURL}registration/${id}`, {
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

export const updateRegistrationStatus = createAsyncThunk(
  "admission/application/updateRegistrationStatus",
  async (updateApplication, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}update-registration-status`,
        updateApplication,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;
      if (data) {
        toasterSuccess("success", "Status Updated successfully");
      }
      dispatch(getRegistrations({}));
      return data?.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const eventsAdapter = createEntityAdapter();

export const {
  selectAll: selectRegistrations,
  selectIds: selectRegistrationIds,
  selectById: selectRegistrationById,
} = eventsAdapter.getSelectors((state) => state.admission.adminRegistrations);

const registrationsSlice = createSlice({
  name: "admission/registrations",
  initialState: eventsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getRegistrations.fulfilled]: eventsAdapter.setAll,
    [getRegistration.fulfilled]: eventsAdapter.setOne,
    [updateRegistrationStatus.fulfilled]: eventsAdapter.upsertOne,
  },
});

export const selectApplication = ({ admission }) =>
  admission.adminRegistrations;

export default registrationsSlice.reducer;
