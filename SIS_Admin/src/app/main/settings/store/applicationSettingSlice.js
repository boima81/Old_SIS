import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import JwtService from "src/app/auth/services/jwtService";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

export const getSetting = createAsyncThunk(
  "settingsApp/applicationSetting/getSetting",
  async () => {
    try {
      // const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(
        `${BASEURL}application_setting`
        // , {
        // headers: { Authorization: `Bearer ${accessToken}` },
        // }
      );
      const data = await response.data;

      return data === undefined ? null : data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const saveSetting = createAsyncThunk(
  "settingsApp/applicationSetting/saveSetting",
  async (settingData, { dispatch, getState }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}application_setting`,
        settingData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;
      dispatch(getSetting());
      toasterSuccess("Success", "Setting Updated Successfully");
      return data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const uploadFileApplication = createAsyncThunk(
  "settingsApp/applicationSetting/uploadFileApplication",
  async ({ files, ...fileData }, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const formData = new FormData();
      let data = {};
      if (files?.length > 0) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < files?.length; i++) {
          const file = files?.[i];
          formData.append("file", file);
        }
        const response = await axios.post(`${BASEURL}file-upload`, formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        data = await response.data;
        fileData[fileData.key] = data.data?.[0];
      }

      dispatch(
        saveSetting({
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

export const uploadFile = createAsyncThunk(
  "settingsApp/applicationSetting/uploadFile",
  async ({ files, ...fileData }, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const formData = new FormData();
      let data = {};
      if (files?.length > 0) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < files?.length; i++) {
          const file = files?.[i];
          formData.append("file", file);
        }
        const response = await axios.post(`${BASEURL}file-upload`, formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        data = await response.data;
        fileData[fileData.key] = data.data?.[0];
      }

      return data?.data[0];
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);



const applicationSettingSlice = createSlice({
  name: "settingsApp/applicationSetting",
  initialState: null,
  extraReducers: {
    [getSetting.fulfilled]: (state, action) => action.payload,
    [saveSetting.fulfilled]: (state, action) => action.payload,
    [uploadFileApplication.fulfilled]: (state, action) => action.payload,
    [uploadFile.fulfilled]: (state, action) => action.payload,

  },
});

export const selectApplicationSetting = ({ settingsApp }) =>
  settingsApp?.applicationSetting;

export default applicationSettingSlice.reducer;
