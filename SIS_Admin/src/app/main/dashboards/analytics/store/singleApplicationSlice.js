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
import { setUser } from "app/store/userSlice";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../../Shared/utils";

export const getApplication = createAsyncThunk(
  "admission/singleApplication/getApplication",
  async (id) => {
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.get(`${BASEURL}application/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.data;
        if (data?.id) {
          return data;
        }
        return {};
      }
      return {};
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const applicationSlice = createSlice({
  name: "admission/singleApplication",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getApplication.fulfilled]: (state, action) => action.payload,
  },
});

export const selectSingleApplication = ({ admission }) =>
  admission.singleApplication;

export default applicationSlice.reducer;
