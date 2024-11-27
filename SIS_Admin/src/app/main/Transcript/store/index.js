import { combineReducers } from "@reduxjs/toolkit";
import fees from "./feesSlice";

const reducer = combineReducers({
  fees,
});

export default reducer;
