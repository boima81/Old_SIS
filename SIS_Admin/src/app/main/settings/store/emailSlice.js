import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import JwtService from "src/app/auth/services/jwtService";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

export const getEmail = createAsyncThunk(
  "settingsApp/emailSetting/getEmail",
  async (userId) => {
    console.log("userId--->>>", userId);
    try {
      if (userId) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.get(`${BASEURL}email-settings/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.data;

        return data === undefined ? null : data;
      }
      return {};
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const removeUser = createAsyncThunk(
  "settingsApp/user/removeUser",
  async (val, { dispatch, getState }) => {
    try {
      const { id } = getState().settingsApp.user;
      await axios.delete(`/api/ecommerce/products/${id}`);
      return id;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const saveEmail = createAsyncThunk(
  "settingsApp/user/saveEmail",
  async (userData, { dispatch, getState }) => {
    try {
      const accessToken = await JwtService.getAccessToken();

      const response = await axios.post(
        `${BASEURL}email-settings/create`,
        userData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const data = await response.data;
      if (data?.data?.id) {
        toasterSuccess("Success", "Email setting added Successfully");
      }

      return data?.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const emailSlice = createSlice({
  name: "settingsApp/emailSetting",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getEmail.fulfilled]: (state, action) => action.payload,
    [saveEmail.fulfilled]: (state, action) => action.payload,
    [removeUser.fulfilled]: (state, action) => null,
  },
});

export const selectEmail = ({ settingsApp }) => settingsApp;

// export const { newUser, resetUser } = emailSlice.actions;

export default emailSlice.reducer;
