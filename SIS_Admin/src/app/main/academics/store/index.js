import { combineReducers } from "@reduxjs/toolkit";
import programs from "./programsSlice";
import program from "./programSlice";

import courses from "./coursesSlice";
import course from "./courseSlice";

import semesters from "./semestersSlice";
import semester from "./semesterSlice";

import instructors from "./instructorsSlice";
import instructor from "./instructorSlice";

import sections from "./sectionsSlice";
import section from "./sectionSlice";

const reducer = combineReducers({
  // user,
  instructors,
  instructor,
  sections,
  section,
  programs,
  program,
  courses,
  course,
  semesters,
  semester,
});

export default reducer;
