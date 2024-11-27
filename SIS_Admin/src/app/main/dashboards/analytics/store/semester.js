import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../../Shared/utils";

export const getSemester = createAsyncThunk(
  "admission/semester/getSemester",
  async (id) => {
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();

        const response = await axios.get(`${BASEURL}program/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = await response.data;

        return data;
      }
      return [];
    } catch (error) {
      toaster("error", error.response);
      return [];
    }
  }
);

const studentSlice = createSlice({
  name: "admission/semester",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getSemester.fulfilled]: (state, action) => action.payload,
  },
});

export const selectSemester = ({ semester }) => semester;

export default studentSlice.reducer;
