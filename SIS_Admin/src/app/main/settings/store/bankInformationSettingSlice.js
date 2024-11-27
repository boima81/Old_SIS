import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import JwtService from "src/app/auth/services/jwtService";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

export const getSetting = createAsyncThunk(
  "settingsApp/bankInformationSetting/getSetting",
  async () => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}bank_information_setting`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.data;

      return data === undefined ? null : data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const saveSetting = createAsyncThunk(
  "settingsApp/bankInformationSetting/saveSetting",
  async (settingData, { dispatch, getState }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.post(
        `${BASEURL}bank_information_setting`,
        settingData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data;
      toasterSuccess("Success","Bank Information Updated")
      dispatch(getSetting());
      return data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const bankInformationSettingSlice = createSlice({
  name: "settingsApp/bankInformationSetting",
  initialState: null,
  extraReducers: {
    [getSetting.fulfilled]: (state, action) => action.payload,
    [saveSetting.fulfilled]: (state, action) => action.payload,
  },
});

export const selectBankInformationSetting = ({ settingsApp }) =>
  settingsApp?.bankInformationSetting;

export default bankInformationSettingSlice.reducer;
