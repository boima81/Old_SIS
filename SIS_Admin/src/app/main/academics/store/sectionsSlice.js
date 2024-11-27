import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../../dashboards/Shared/utils";

export const getSections = createAsyncThunk(
  "academics/sections/getSections",
  async () => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}sections`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const deleteSections = createAsyncThunk(
  "academics/sections/deleteSections",
  async (ids, { dispatch }) => {
    if (ids?.length > 0) {
      try {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.delete(`${BASEURL}sections?id=${ids}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(getSections());
        return response.data;
      } catch (error) {
        toaster("error", error.response);
        return {};
      }
    }
    return {};
  }
);

const sectionsAdapter = createEntityAdapter({});

export const {
  selectAll: selectSections,
  selectEntities: selectSectionsEntities,
  selectById: selectSectionById,
} = sectionsAdapter.getSelectors((state) => state?.academics?.sections);

const sectionSlice = createSlice({
  name: "academics/sections",
  initialState: sectionsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getSections.fulfilled]: sectionsAdapter.setAll,
    [deleteSections.fulfilled]: (state, action) => {
      state = {};
    },
  },
});

export const selectSectionsData = ({ academics }) => academics?.sections || [];

export default sectionSlice.reducer;
