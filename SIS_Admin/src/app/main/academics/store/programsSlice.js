import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../../dashboards/Shared/utils";

export const getPrograms = createAsyncThunk(
  "academics/programs/getPrograms",
  async ({ search = "" }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}programs?search=${search}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const deleteProgram = createAsyncThunk(
  "academics/programs/deleteProgram",
  async (ids, { dispatch }) => {
    if (ids?.length > 0) {
      try {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.delete(`${BASEURL}programs?id=${ids}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(getPrograms({}));
        return response.data;
      } catch (error) {
        toaster("error", error.response);
        return {};
      }
    }
    return {};
  }
);

const programsAdapter = createEntityAdapter({});

export const {
  selectAll: selectPrograms,
  selectEntities: selectProgramsEntities,
  selectById: selectProjectById,
} = programsAdapter.getSelectors((state) => state.academics.programs);

const programsSlice = createSlice({
  name: "academics/programs",
  initialState: programsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getPrograms.fulfilled]: programsAdapter.setAll,
    [deleteProgram.fulfilled]: (state, action) => {
      state = {};
    },
  },
});

export default programsSlice.reducer;
