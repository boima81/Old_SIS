import { combineReducers } from "@reduxjs/toolkit";

import adminApplications from "./applicationsSlice";
import adminApplication from "./applicationSlice";

import adminStudents from "./studentsSlice";
import adminStudent from "./studentSlice";

import adminRegistrations from "./registrationsSlice";
import adminRegistration from "./registrationSlice";

const reducer = combineReducers({
  adminApplications,
  adminApplication,
  adminRegistrations,
  adminRegistration,
  adminStudents,
  adminStudent,
});

export default reducer;
