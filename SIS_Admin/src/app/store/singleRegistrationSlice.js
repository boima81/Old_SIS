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
  "singleRegistration/getRegistration",
  async (id) => {
    try {
      console.log({ id });
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
  "singleRegistration/addRegistration",
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

export const uploadFileRegister = createAsyncThunk(
  "singleRegistration/uploadFileRegister",
  async ({ files, ...fileData }, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const formData = new FormData();
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < files?.length; i++) {
        const file = files?.[i];
        formData.append("file", file);
      }
      const response = await axios.post(`${BASEURL}file-upload`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.data;
      dispatch(
        addRegistration({
          [fileData.key]: data.data,
          ...fileData,
        })
      );
      return data?.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const singleRegistrationSlice = createSlice({
  name: "singleRegistration",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getRegistration.fulfilled]: (state, action) => action.payload,
    [addRegistration.fulfilled]: (state, action) => action.payload,
    [uploadFileRegister.fulfilled]: (state, action) => action.payload,
  },
});

export const selectRegistration = ({ singleRegistration }) =>
  singleRegistration;

export default singleRegistrationSlice.reducer;
