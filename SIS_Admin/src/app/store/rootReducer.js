import { combineReducers } from "@reduxjs/toolkit";
import { reducer as toastrReducer } from "react-redux-toastr";
import fuse from "./fuse";
import i18n from "./i18nSlice";
import user from "./userSlice";
import student from "./studentSlice";
import semester from "./semesterSlice";
import application from "./applicationSlice";
import course from "./courseSlice";
import registration from "./registrationSlice";
import singleRegistration from "./singleRegistrationSlice";
import singleApplication from "./singleApplicationSlice";
import studentsReport from "./studentsReport";
import courses from "./coursesSlice";
import instructors from "./instructorsSlice";

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    toastr: toastrReducer,
    fuse,
    i18n,
    user,
    student,
    semester,
    application,
    course,
    registration,
    singleRegistration,
    singleApplication,
    studentsReport,
    courses,
    instructors,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === "user/userLoggedOut") {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
