import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../main/dashboards/Shared/utils";

export const getInstructors = createAsyncThunk(
  "instructors/getInstructors",
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

const instructorsSlice = createSlice({
  name: "instructors",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getInstructors.fulfilled]: (state, action) => action.payload,
  },
});
export const selectInstructors = ({ instructors }) => instructors || [];

export default instructorsSlice.reducer;
