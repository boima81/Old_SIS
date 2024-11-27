import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../../Shared/utils";

export const getWidgets = createAsyncThunk(
  "analyticsDashboardApp/widgets/getWidgets",
  async () => {
    try {
      const accessToken = await JwtService.getAccessToken();

      const response = await axios.get(`${BASEURL}program`, {
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

const widgetsSlice = createSlice({
  name: "analyticsDashboardApp/widgets",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: (state, action) => action.payload,
  },
});

export const selectWidgets = ({ analyticsDashboardApp }) =>
  analyticsDashboardApp.widgets;

export default widgetsSlice.reducer;
