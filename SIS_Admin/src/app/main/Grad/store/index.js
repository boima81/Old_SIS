import { combineReducers } from "@reduxjs/toolkit";
import grades from "./gradesSlice";
import grade from "./gradeSlice";

const reducer = combineReducers({
  grades,
  grade,
});

export default reducer;
