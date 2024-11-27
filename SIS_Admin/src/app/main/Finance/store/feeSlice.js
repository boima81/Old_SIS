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

export const getFee = createAsyncThunk("finances/fee/getFee", async (id) => {
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
});

const feeSlice = createSlice({
  name: "finances/fee",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getFee.fulfilled]: (state, action) => action.payload,
  },
});

export const selectFee = ({ finances }) => finances.fee;

export default feeSlice.reducer;
