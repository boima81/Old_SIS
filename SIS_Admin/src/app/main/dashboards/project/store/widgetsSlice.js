import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toaster } from "../../Shared/utils";

export const getWidgets = createAsyncThunk(
  "projectDashboardApp/widgets/getWidgets",
  async () => {
    try {
      // const response = await axios.get("/api/dashboards/project/widgets");
      // const data = await response.data;

      return {};
    } catch (error) {
      console.log("error", error);
      toaster("error", error.response);
      return {};
    }
  }
);

const widgetsSlice = createSlice({
  name: "projectDashboardApp/widgets",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: (state, action) => action.payload,
  },
});

export const selectWidgets = ({ projectDashboardApp }) =>
  projectDashboardApp.widgets;

export default widgetsSlice.reducer;
