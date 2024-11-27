import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import JwtService from "src/app/auth/services/jwtService";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";
import { getStudents } from "../../Admission/store/studentsSlice";

export const getUser = createAsyncThunk(
  "settingsApp/user/getUser",
  async (userId) => {
    try {
      if (userId) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.get(`${BASEURL}user/${userId}`, {
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
  async (id, { dispatch, getState }) => {
    try {
      const accessToken = await JwtService.getAccessToken();

      const response = await axios.delete(`${BASEURL}user/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await response.data;
      if (data?.data?.id) {
        toasterSuccess(
          "Success",
          data?.data?.message || "User Deleted Successfully"
        );
      }

      return await dispatch(getStudents);
    } catch (error) {
      console.log({ error });
      toaster("error", error.response);
      return {};
    }
  }
);

export const saveUser = createAsyncThunk(
  "settingsApp/user/saveUser",
  async (userData, { dispatch, getState }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      let url = `${BASEURL}user/create`;
      if (userData?.id) {
        url = `${BASEURL}user/update/${userData?.id}`;
      }
      const response = await axios.post(url, userData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await response.data;
      if (data?.data?.id) {
        toasterSuccess(
          "Success",
          userData?.id
            ? "User Updated Successfully"
            : "User Created Successfully"
        );
      }

      return data?.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const userSlice = createSlice({
  name: "settingsApp/user",
  initialState: null,
  reducers: {
    resetUser: () => null,
    newUser: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {},
      }),
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => action.payload,
    [saveUser.fulfilled]: (state, action) => action.payload,
    [removeUser.fulfilled]: (state, action) => null,
  },
});

export const { newUser, resetUser } = userSlice.actions;

export const selectUser = ({ settingsApp }) => settingsApp.user;

export default userSlice.reducer;
