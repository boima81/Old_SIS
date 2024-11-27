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
import { toaster } from "../main/dashboards/Shared/utils";

export const getRegistration = createAsyncThunk(
  "registration/getRegistration",
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

export const addRegistration = createAsyncThunk(
  "registration/addRegistration",
  async (newRegistration, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}registration`,
        newRegistration,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;
      dispatch(getRegistration(data.data.id));
      return data?.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const eventsAdapter = createEntityAdapter({});

export const {
  selectAll: selectRegistrations,
  selectIds: selectRegistrationIds,
  selectById: selectRegistrationById,
} = eventsAdapter.getSelectors((state) => state.registration);

const registrationSlice = createSlice({
  name: "registration",
  initialState: eventsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getRegistration.fulfilled]: eventsAdapter.setOne,
    [addRegistration.fulfilled]: eventsAdapter.addOne,
  },
});

export const selectRegistration = ({ registration }) => registration;

export default registrationSlice.reducer;
