import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

export const getAgencys = createAsyncThunk(
  "agency/agencys/getAgencys",
  async ({ search = "" }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}agency?search=${search}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return [];
    }
  }
);

export const deleteAgency = createAsyncThunk(
  "agency/agencys/deleteAgency",
  async (ids, { dispatch }) => {
    if (ids) {
      try {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.delete(`${BASEURL}agency/${ids}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.data) {
          toasterSuccess("Success", "Agency successfully deleted");
        }
        dispatch(getAgencys({}));
        return response.data;
      } catch (error) {
        toaster("error", error.response);
        return {};
      }
    }
    return {};
  }
);


// Multiple Recoreds
export const selectAgencies = ({ agencys }) => agencys?.agencies || [];

const agencysSlice = createSlice({
  name: "agency/agencys",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getAgencys.fulfilled]: (state, action) => action.payload,
    [deleteAgency.fulfilled]: (state, action) => action.payload,
  }
});

export default agencysSlice.reducer;
