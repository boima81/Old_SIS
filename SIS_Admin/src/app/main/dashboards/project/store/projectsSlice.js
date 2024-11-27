import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
import { toaster } from "../../Shared/utils";

export const getProjects = createAsyncThunk(
  "projectDashboardApp/projects/getProjects",
  async () => {
    try {
      const response = await axios.get("/api/dashboards/project/projects");
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const projectsAdapter = createEntityAdapter({});

export const {
  selectAll: selectProjects,
  selectEntities: selectProjectsEntities,
  selectById: selectProjectById,
} = projectsAdapter.getSelectors((state) => state.projectDashboardApp.projects);

const projectsSlice = createSlice({
  name: "projectDashboardApp/projects",
  initialState: projectsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getProjects.fulfilled]: projectsAdapter.setAll,
  },
});

export default projectsSlice.reducer;
