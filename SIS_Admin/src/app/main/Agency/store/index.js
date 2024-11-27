import { combineReducers } from "@reduxjs/toolkit";
import agency from "./agencySlice";
import agencies from "./agencysSlice";

const reducer = combineReducers({
  agencies,
  agency,
});

export default reducer;
