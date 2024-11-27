import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../../dashboards/Shared/utils";

export const getInstructors = createAsyncThunk(
  "academics/instructors/getInstructors",
  async () => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}instructors`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log({ response });
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const deleteInstructors = createAsyncThunk(
  "academics/instructors/deleteInstructors",
  async (ids, { dispatch }) => {
    if (ids?.length > 0) {
      try {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.delete(`${BASEURL}semesters?id=${ids}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(getInstructors());
        return response.data;
      } catch (error) {
        toaster("error", error.response);
        return {};
      }
    }
    return {};
  }
);

// const instructorsAdapter = createEntityAdapter({});

// export const {
//   selectAll: selectInstructors,
//   selectEntities: selectInstructorsEntities,
//   selectById: selectInstructorById,
// } = instructorsAdapter.getSelectors((state) => state.academics?.instructors);

const instructorsSlice = createSlice({
  name: "academics/instructors",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getInstructors.fulfilled]: (state, action) => action.payload,
    [deleteInstructors.fulfilled]: (state, action) => {
      state = {};
    },
  },
});
export const selectInstructorData = ({ academics }) =>
  academics?.instructors || [];

export default instructorsSlice.reducer;
