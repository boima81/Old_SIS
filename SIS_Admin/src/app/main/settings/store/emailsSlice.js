import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../../dashboards/Shared/utils";

export const getEmails = createAsyncThunk(
  "settingsApp/emailSetting/getEmails",
  async () => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}email-settings`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log({ response });
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return [];
    }
  }
);

const emailsSlice = createSlice({
  name: "settingsApp/emailSetting",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getEmails.fulfilled]: (state, action) => action.payload,
  },
});

export const getEmailsData = ({ settingsApp }) => settingsApp?.emails || [];

export default emailsSlice.reducer;
