import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../../dashboards/Shared/utils";

export const getSemesters = createAsyncThunk(
  "academics/semesters/getSemesters",
  async ({ search = "" }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}semesters?search=${search}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return [];
    }
  }
);

export const deleteSemester = createAsyncThunk(
  "academics/semesters/deleteSemester",
  async (ids, { dispatch }) => {
    if (ids?.length > 0) {
      try {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.delete(`${BASEURL}semesters?id=${ids}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(getSemesters({}));
        return response.data;
      } catch (error) {
        toaster("error", error.response);
        return {};
      }
    }
    return {};
  }
);

const semestersAdapter = createEntityAdapter({});

export const {
  selectAll: selectSemesters,
  selectEntities: selectSemestersEntities,
  selectById: selectSemesterById,
} = semestersAdapter.getSelectors((state) => state.academics.semesters);

const semestersSlice = createSlice({
  name: "academics/semesters",
  initialState: semestersAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getSemesters.fulfilled]: semestersAdapter.setAll,
    [deleteSemester.fulfilled]: (state, action) => {
      state = {};
    },
  },
});

export default semestersSlice.reducer;
