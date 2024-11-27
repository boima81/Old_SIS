import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import JwtService from "src/app/auth/services/jwtService";
import { toaster } from "../../dashboards/Shared/utils";

export const getUser = createAsyncThunk(
  "settingsApp/user/getUser",
  async (userId) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}user/${userId}`, {
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

export const saveUser = createAsyncThunk(
  "settingsApp/user/saveUser",
  async (userData, { dispatch, getState }) => {
    try {
      const { id } = getState().settingsApp;

      const response = await axios.put(
        `/api/ecommerce/products/${id}`,
        userData
      );

      const data = await response.data;

      return data;
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
        payload: {
          id: FuseUtils.generateGUID(),
          name: "",
          handle: "",
          description: "",
          categories: [],
          tags: [],
          images: [],
          priceTaxExcl: 0,
          priceTaxIncl: 0,
          taxRate: 0,
          comparedPrice: 0,
          quantity: 0,
          sku: "",
          width: "",
          height: "",
          depth: "",
          weight: "",
          extraShippingFee: 0,
          active: true,
        },
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
