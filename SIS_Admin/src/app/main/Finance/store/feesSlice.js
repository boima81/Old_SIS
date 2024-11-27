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

export const getRegistrationFees = createAsyncThunk(
  "finances/fees/getRegistrationFees",
  async ({ search = "" }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(
        `${BASEURL}registration-fees?search=${search}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;
      return data;
    } catch (error) {
      toaster("error", error.response);
      return [];
    }
  }
);

export const getApplication = createAsyncThunk(
  "finances/fees/getApplication",
  async (id) => {
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.get(`${BASEURL}registration-fees/${id}`, {
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

export const updateRegistrationFees = createAsyncThunk(
  "finances/fees/updateRegistrationFees",
  async (updateRegistration, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}create-update-registration-fees`,
        updateRegistration,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;
      dispatch(getRegistrationFees());
      return data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const deleteRegistrationFees = createAsyncThunk(
  "finances/fees/deleteRegistrationFees",
  async (ids, { dispatch }) => {
    if (ids?.length > 0) {
      try {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.delete(
          `${BASEURL}delete-registration-fees?id=${ids}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        toasterSuccess("Success", "Registration fees successfully deleted");
        return response.data;
      } catch (error) {
        console.log({ error });
        toaster("error", error.response);
        dispatch(getRegistrationFees());
        return {};
      }
    }
    return {};
  }
);

const registrationFeesSlice = createSlice({
  name: "finances/fees",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getRegistrationFees.fulfilled]: (state, action) => action.payload,
    [getApplication.fulfilled]: (state, action) => action.payload,
    [updateRegistrationFees.fulfilled]: (state, action) => action.payload,
    [deleteRegistrationFees.fulfilled]: (state, action) => action.payload,
  },
});

export const selectRegistrationFees = ({ finances }) => finances?.fees || [];

export default registrationFeesSlice.reducer;
