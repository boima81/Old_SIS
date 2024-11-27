import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { authRoles } from "src/app/auth";

const Sections = lazy(() => import("./sections/Sections"));
const SectionsForm = lazy(() => import("./sections/SectionsForm"));

const Programs = lazy(() => import("./programs/Programs"));
const Instructor = lazy(() => import("./instructor/Instructor"));
const Courses = lazy(() => import("./courses/Courses"));
const Semester = lazy(() => import("./semester/Semester"));
const ProgramsForm = lazy(() => import("./programs/ProgramsForm"));
const InstructorForm = lazy(() => import("./instructor/InstructorForm"));
const CoursesForm = lazy(() => import("./courses/CoursesForm"));
const SemesterForm = lazy(() => import("./semester/SemesterForm"));
const User = lazy(() => import("./user/User"));

const AcademicsApp = {
  settings: {
    layout: {},
    auth: authRoles.academics,
  },
  routes: [
    {
      path: "academics/programs",
      element: <Programs />,
      auth: authRoles.academics,
    },
    {
      path: "academics/programs/:programId",
      element: <ProgramsForm />,
      auth: authRoles.academics,
    },
    {
      path: "academics/courses",
      element: <Courses />,
      auth: [...authRoles.instructors, ...authRoles.academics],
    },
    {
      path: "academics/courses/:courseId",
      element: <CoursesForm />,
      auth: authRoles.academics,
    },
    {
      path: "academics/semesters",
      element: <Semester />,
      auth: authRoles.academics,
    },
    {
      path: "academics/semesters/:semesterId",
      element: <SemesterForm />,
      auth: authRoles.academics,
    },
    {
      path: "academics/semesters",
      element: <User />,
      auth: authRoles.academics,
    },
    {
      path: "academics/courses",
      element: <User />,
      auth: authRoles.academics,
    },
    {
      path: "academics/instructors",
      element: <Instructor />,
      auth: authRoles.academics,
    },
    {
      path: "academics/instructors/:instructorId",
      element: <InstructorForm />,
      auth: authRoles.academics,
    },
    // {
    //   path: "academics/instructors/add",
    //   element: <InstructorForm />,
    //   auth: authRoles.academics,
    // },
    {
      path: "academics/sections",
      element: <Sections />,
      auth: authRoles.academics,
    },
    {
      path: "academics/sections/:sectionId",
      element: <SectionsForm />,
      auth: authRoles.academics,
    },
    {
      path: "academics/sections/add",
      element: <SectionsForm />,
      auth: authRoles.academics,
    },
  ],
};

export default AcademicsApp;
