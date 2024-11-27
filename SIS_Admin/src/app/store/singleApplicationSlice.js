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
  "singleApplication/getApplication",
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
  "singleApplication/addApplication",
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
  "singleApplication/uploadFileApplication",
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

export const deleteApplicationFile = createAsyncThunk(
  "singleApplication/deleteApplicationFile",
  async (id, { dispatch, getState }) => {
    const { singleApplication } = getState();
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.get(
          `${BASEURL}application-file-remove/${id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const data = await response.data;
        if (data?.applicationId) {
          const newApplication = await dispatch(
            getApplication(data?.applicationId)
          );
          
          return newApplication?.payload;
        }
        return singleApplication;
      }
      return singleApplication;
    } catch (error) {
      toaster("error", error.response);
      return singleApplication;
    }
  }
);

const singleApplicationSlice = createSlice({
  name: "singleApplication",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getApplication.fulfilled]: (state, action) => action.payload,
    [addApplication.fulfilled]: (state, action) => action.payload,
    [uploadFileApplication.fulfilled]: (state, action) => action.payload,
    [deleteApplicationFile.fulfilled]: (state, action) => action.payload,
  },
});

export const selectApplication = ({ singleApplication }) => singleApplication;

export default singleApplicationSlice.reducer;
