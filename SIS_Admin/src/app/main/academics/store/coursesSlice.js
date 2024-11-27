import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../../dashboards/Shared/utils";

export const getCourses = createAsyncThunk(
  "academics/courses/getCourses",
  async ({ search = "" }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}courses?search=${search}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "academics/courses/deleteCourse",
  async (ids, { dispatch }) => {
    if (ids?.length > 0) {
      try {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.delete(`${BASEURL}courses?id=${ids}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(getCourses({}));
        return response.data;
      } catch (error) {
        toaster("error", error.response);
        return {};
      }
    }
    return {};
  }
);

// const coursesAdapter = createEntityAdapter({});
// export const {
//   selectAll: selectCourses,
//   selectEntities: selectCoursesEntities,
//   selectById: selectCourseById,
// } = coursesAdapter.getSelectors((state) => state.academics.courses);

export const selectCourses = ({ academics }) => academics.courses || []


const coursesSlice = createSlice({
  name: "academics/courses",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getCourses.fulfilled]: (state, action) => action.payload,
    [deleteCourse.fulfilled]: (state, action) => {
      state = {};
    },
  },
});

export default coursesSlice.reducer;
