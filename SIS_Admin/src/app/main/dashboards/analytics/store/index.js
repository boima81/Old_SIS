import { combineReducers } from "@reduxjs/toolkit";
import widgets from "./widgetsSlice";
import student from "./studentSlice";
import semester from "./semester";
import application from "./applicationSlice";
import singleApplication from "./singleApplicationSlice";

const reducer = combineReducers({
  widgets,
  student,
  semester,
  application,
  singleApplication,
});

export default reducer;
