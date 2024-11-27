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

export const getApplications = createAsyncThunk(
  "application/getApplications",
  async () => {
    const accessToken = await JwtService.getAccessToken();
    const response = await axios.get(`${BASEURL}applications`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.data;

    return data;
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

export const addApplication = createAsyncThunk(
  "application/addApplication",
  async (newApplication, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}application`,
        newApplication,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;
      dispatch(getApplication(data.data.id));
      return data?.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const uploadFileApplication = createAsyncThunk(
  "application/uploadFileApplication",
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
        addApplication({
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



const eventsAdapter = createEntityAdapter();

export const {
  selectAll: selectApplications,
  selectIds: selectApplicationIds,
  selectById: selectApplicationById,
} = eventsAdapter.getSelectors((state) => state.application);

const applicationSlice = createSlice({
  name: "application",
  initialState: eventsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getApplications.fulfilled]: eventsAdapter.setAll,
    [getApplication.fulfilled]: eventsAdapter.setOne,
    [addApplication.fulfilled]: eventsAdapter.addOne,
    [uploadFileApplication.fulfilled]: eventsAdapter.setOne,
  },
});

export const selectApplication = ({ application }) => application;

export default applicationSlice.reducer;
