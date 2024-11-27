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
  "admission/application/getApplication",
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

export const addApplication = createAsyncThunk(
  "admission/application/addApplication",
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
      const userData = await JwtService.signInWithToken();
      if (userData) {
        dispatch(setUser(userData));
      }

      return data?.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const uploadFileApplication = createAsyncThunk(
  "admission/application/uploadFileApplication",
  async ({ files, ...fileData }, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const formData = new FormData();
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < files?.length; i++) {
        const file = files?.[i];
        console.log({ type: typeof file });
        formData.append("file", file);
      }
      const response = await axios.post(`${BASEURL}file-upload`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.data;
      console.log({ data });
      const applicationData = await dispatch(
        addApplication({
          [fileData.key]: data.data,
          ...fileData,
        })
      );
      console.log({ applicationData });
      return applicationData?.payload;
    } catch (error) {
      console.log({ error });
      toaster("error", error.response);
      return {};
    }
  }
);



const eventsAdapter = createEntityAdapter({});

export const {
  selectAll: selectApplications,
  selectIds: selectApplicationIds,
  selectById: selectApplicationById,
} = eventsAdapter.getSelectors((state) => state.admission.application);

const applicationSlice = createSlice({
  name: "admission/application",
  initialState: eventsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getApplications.fulfilled]: eventsAdapter.setAll,
    [getApplication.fulfilled]: (state, action) => action.payload,
    [addApplication.fulfilled]: (state, action) => action.payload,
    [uploadFileApplication.fulfilled]: (state, action) => action.payload,
  },
});

export const selectApplication = ({ analyticsDashboardApp }) =>
  analyticsDashboardApp.application;

export default applicationSlice.reducer;
