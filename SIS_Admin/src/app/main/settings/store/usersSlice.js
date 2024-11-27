import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster } from "../../dashboards/Shared/utils";

export const getUsers = createAsyncThunk(
  "settingsApp/users/getUsers",
  async ({ role = "", registration = 0, application = 0, search = "" }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(
        `${BASEURL}user?role=${role}&registration=${registration}&application=${application}&search=${search}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

const usersAdapter = createEntityAdapter({});

export const {
  selectAll: selectUsers,
  selectEntities: selectUsersEntities,
  selectById: selectProjectById,
} = usersAdapter.getSelectors((state) => state.settingsApp.users);

const usersSlice = createSlice({
  name: "settingsApp/users",
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getUsers.fulfilled]: usersAdapter.setAll,
  },
});

export default usersSlice.reducer;
