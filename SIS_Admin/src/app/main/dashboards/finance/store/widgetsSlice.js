import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toaster } from "../../Shared/utils";

export const getWidgets = createAsyncThunk(
  "financeDashboardApp/widgets/getWidgets",
  async () => {
    try {
      const response = await axios.get("/api/dashboards/finance/widgets");

      const data = await response.data;

      return data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const widgetsSlice = createSlice({
  name: "financeDashboardApp/widgets",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: (state, action) => action.payload,
  },
});

export const selectWidgets = ({ financeDashboardApp }) =>
  financeDashboardApp.widgets;

export default widgetsSlice.reducer;
